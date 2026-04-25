
import { Text, View } from "react-native";
import { Camera, useCameraDevices,useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
export default function CameraScreen() {
    const device = useCameraDevice('back');
    const { hasPermission, requestPermission } = useCameraPermission();
    if(!device) return (<View><Text>Loading...</Text></View>);
    // const device = devices.back; // 후면 카메라 선택
    return (
        <Camera
            style={{flex: 1}}
            device={device}
            isActive={true} // 현재 카메라 활성화 여부
            photo={true}    // 사진 촬영 기능 활성화
    />
    ) 
}
