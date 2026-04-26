
import { Button } from "@react-navigation/elements";
import { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
export default function CameraScreen({ isCameraActive, setIsCameraActive, title, type}: { isCameraActive: boolean, setIsCameraActive: React.Dispatch<React.SetStateAction<boolean>>, title: string, type: string }) {
    const [cameraPosition, setCameraPosition] = useState<'front' | 'back'>('back');
    const device = useCameraDevice(cameraPosition);
    const { hasPermission, requestPermission } = useCameraPermission();
    
    const toggleCameraPosition = () => {
        setCameraPosition((prev) => (prev === 'back' ? 'front' : 'back'));
    };

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
