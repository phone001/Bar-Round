import Container from "@/components/common/Contailner";
import { JSX,useState} from "react";
import { useAtomValue } from "jotai";
import { Text, View, StyleSheet,Image ,ImageSourcePropType,TouchableOpacity} from "react-native";
import { cartItemAtom } from "@/common/cartItem";
import { numberFormatter } from "@/util/format";
import CameraScreen from "@/components/camera";

export default function AuthScreen(): JSX.Element {
    const { tableId, items } = useAtomValue(cartItemAtom);
    const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
    const [type, setType] = useState<string>("id"); 
    const [title, setTitle] = useState<string>("신분증 인증"); 


    const handleCameraOpen = (authType: string) => {
        setType(authType);
        if (authType === "id") {
            setTitle("신분증 인증");
        } else if (authType === "face") {
            setTitle("얼굴 인증");
        }
        setIsCameraActive(true);
    }

    return (
        isCameraActive ? (
             <CameraScreen 
             isCameraActive={isCameraActive} 
             setIsCameraActive={setIsCameraActive}
             title={title}
             type={type}
             />
        ) : (
        <Container className="justify-center items-center">
            <TouchableOpacity onPress={() => handleCameraOpen("id")}>
                <View className="bg-[rgb(27,32,39)] w-80 h-48 border border-gray-300 rounded-lg flex items-center justify-center">
                    <View className="w-16 h-16 bg-gray-500 rounded-full mb-4 border border-gray-300 flex items-center justify-center rounded-lg">
                    <Text className="text-[rgb(205,167,123)] font-bold">+19</Text>
                    </View>
                    <Text className="text-white font-bold font">신분증 인증</Text>
                    <Text className="text-white text-sm">19세 이상만 이용 가능합니다.</Text>
                </View>
           </TouchableOpacity>
            <View className="h-10" />
            <TouchableOpacity onPress={() => handleCameraOpen("face")}>
                <View className="bg-[rgb(27,32,39)] w-80 h-48 border border-gray-300 rounded-lg flex items-center justify-center">
                    <View className="w-16 h-16 bg-gray-500 rounded-full mb-4 border border-gray-300 flex items-center justify-center rounded-lg">
                    </View>
                    <Text className="text-white font-bold font">얼굴 인증</Text>
                </View>
           </TouchableOpacity>
        </Container>
        )
    );
}