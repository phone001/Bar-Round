import { Button } from "@react-navigation/elements";
import { useRef, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity ,NativeModules, Alert, Dimensions } from "react-native";
import { Camera, PhotoFile, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import TextRecognition,{TextRecognitionScript} from '@react-native-ml-kit/text-recognition';
import * as MediaLibrary from 'expo-media-library';
import ImageEditor from '@react-native-community/image-editor';


export default function CameraScreen({ isCameraActive, setIsCameraActive, title, type}: { isCameraActive: boolean, setIsCameraActive: React.Dispatch<React.SetStateAction<boolean>>, title: string, type: string }) {
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
    const device = useCameraDevice(cameraPosition);
    const camera = useRef<Camera>(null);
    const { hasPermission, requestPermission } = useCameraPermission();
    
    const toggleCameraPosition = () => {
        setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
    };

    const resizing = async (photo:PhotoFile) => {
        const { width, height } = photo;
        console.log(`Original dimensions: ${width}x${height}`);

        const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

        // 스캔 영역(박스) 크기
        const targetWidth = type === 'id' ? 400 : 300;
        const targetHeight = type === 'id' ? 250 : 400;

        // 화면 크기와 사진 해상도의 비율 계산 (기본 cover 기준 최대 비율 적용)
        const scale = Math.max(width / screenWidth, height / screenHeight);

        // 실제 자를 영역의 픽셀 크기
        const cropWidth = targetWidth * scale;
        const cropHeight = targetHeight * scale;

        // 화면 정중앙을 기준으로 자르기 위한 시작점(x, y) 계산
        const originX = (width - cropWidth) / 2;
        const originY = (height - cropHeight) / 2;

        const fileUri = photo.path.startsWith('file://') ? photo.path : `file://${photo.path}`;

        // 소수점을 제거(Math.floor)하고 원본 이미지 크기(width, height)를 벗어나지 않도록 보정
        const safeOriginX = Math.max(0, Math.floor(originX));
        const safeOriginY = Math.max(0, Math.floor(originY));
        // 크롭할 영역의 너비/높이가 0 이하가 되면 네이티브에서 에러가 발생하므로 최소 1 이상 보장
        const safeWidth = Math.max(1, Math.min(width - safeOriginX, Math.floor(cropWidth)));
        const safeHeight = Math.max(1, Math.min(height - safeOriginY, Math.floor(cropHeight)));

        console.log(`[Crop Info] Origin: (${safeOriginX}, ${safeOriginY}), Size: ${safeWidth}x${safeHeight}`);

        try {
            // @react-native-community/image-editor를 통한 이미지 크롭
            const cropData = {
                offset: { x: safeOriginX, y: safeOriginY },
                size: { width: safeWidth, height: safeHeight },
            };
            
            const cropResult = await ImageEditor.cropImage(fileUri, cropData);
            // 반환값이 객체({uri: string})인 경우와 문자열(string)인 경우를 모두 안전하게 처리
            const croppedUri = typeof cropResult === 'string' ? cropResult : (cropResult as any).uri;
            return croppedUri;
        } catch (error) {
            console.error('Image manipulation failed:', error);
            throw error; // 에러를 상위로 던져서 takePhoto에서 캐치하도록 함
        }
    }

    const getIdNumber = (text: string) => {
        // 주민등록번호 패턴: 6자리 생년월일 + 7자리 고유번호 (예: 900101-1234567)
        const lines = text.split('\n');
        let idIndex = 0;
        if(lines[0].includes('주민등록') ) {
            idIndex = 2;
        } else if(lines[1].includes('자동차운전')) {
            idIndex = 5;
        }else{
            Alert.alert('인식 실패', '주민등록번호 또는 운전면허번호가 인식되지 않았습니다. 다시 촬영해주세요.');
            return;
        }

        const idNumberFull = lines[idIndex]?.trim();
        const idNumber = idNumberFull?.replace(/[^0-9]/g, ''); // 숫자만 추출

        if (!idNumber||idNumber.length != 13||!idNumber.match(/[0-9]/g)) {
            Alert.alert('인식 실패', '주민등록번호 또는 운전면허번호가 인식되지 않았습니다. 다시 촬영해주세요.');
            return;
        }
        return idNumber;
    }

    const vaildate =(idnumber:number)=>{
        const date = new Date();
        const currentYear = date.getFullYear() % 100;

        const birthYear = idnumber.toString().slice(0, 2);

        const adult = Math.abs(Number(birthYear) - currentYear) >= 19; // 19세 이상이면 true, 미만이면 false
        console.log(Math.abs(Number(birthYear) - currentYear))
        if(!adult){
            Alert.alert('미성년자', '죄송합니다. 미성년자는 이용할 수 없습니다.');
            setIsCameraActive(false);
        } else {
            Alert.alert('인증 완료', '성인 인증이 완료되었습니다.');
            setIsCameraActive(false);
        }
    }

    const savePhotoToGallery = async (uri: string) => {
        try {
            // 미디어 라이브러리(갤러리) 접근 권한 요청
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                // 기기 갤러리에 이미지 저장
                await MediaLibrary.createAssetAsync(uri);
                Alert.alert('저장 완료', '사진이 갤러리에 성공적으로 저장되었습니다.');
            } else {
                Alert.alert('권한 필요', '사진을 저장하려면 갤러리 접근 권한이 필요합니다.');
            }
        } catch (error) {
            console.error('Error saving photo to gallery:', error);
        }
    };

    const takePhoto = async () => {
        if (!device) return;
        if(!camera.current) return;
        try {
            const photo = await camera.current?.takePhoto({
                flash: 'off',
            });
            console.log('Photo taken:', photo);

            
            // 크롭 진행 후 새로운 이미지 경로 반환
            const croppedUri = await resizing(photo);

            // 이미지 갤러리 저장 함수 호출 (자른 이미지를 저장)
            await savePhotoToGallery(croppedUri);

            // 2. 텍스트 인식 실행
            // TextRecognitionScript.KOREAN를 별도로 지정하지 않으면 한국어 인식이 되지 않음
            const result = await TextRecognition.recognize(croppedUri, TextRecognitionScript.KOREAN);
            const {text} = result;
            console.log(text);

            const idNumber = getIdNumber(text);
            vaildate(Number(idNumber));
            // console.log(result)

            
            
        } catch (error) {
            console.error('Error taking photo:', error);
        }
       
    }

    if(!device) return (<View><Text>Loading...</Text></View>);
    // const device = devices.back; // 후면 카메라 선택
    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => setIsCameraActive(false)} style={{ position: 'absolute', top: 40, left: 20, zIndex: 1 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>카메라 종료</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={toggleCameraPosition} style={{ position: 'absolute', top: 40, right: 20, zIndex: 1 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>화면 전환</Text>
            </TouchableOpacity>
            <Camera
                ref={camera}
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true} // 현재 카메라 활성화 여부
                photo={true}    // 사진 촬영 기능 활성화
            />
            
            {/* 오버레이 영역 (텍스트 및 타겟 박스) */}
            <View style={styles.overlay}>
                <Text style={styles.text}>{title}</Text>
                <View style={type === "id" ? styles.scanAreaId : styles.scanAreaFace} />
            </View>
            
            <TouchableOpacity onPress={takePhoto} style={{ position: 'absolute', bottom: 40, alignSelf: 'center', zIndex: 1 }}>
                <Text style={{ color: 'white', fontSize: 18 }}>촬영</Text>
            </TouchableOpacity>
            
        </View>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', 
        padding: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    scanAreaId: {
        width: 400,
        height: 250,
        borderWidth: 2,
        borderColor: '#00FF00', 
        backgroundColor: 'transparent', 
        borderRadius: 12,
    },scanAreaFace: {
        width: 300,
        height: 400,
        borderWidth: 2,
        borderColor: '#00FF00', 
        backgroundColor: 'transparent', 
        borderRadius: 12,
    }
});
