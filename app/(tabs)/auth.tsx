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

    console.log("AuthScreen - cartItemAtom:", { tableId, items });

    return (
        isCameraActive ? (
             <CameraScreen />
        ) : (
        <Container className="justify-center items-center">
            <TouchableOpacity onPress={() => setIsCameraActive(true)}>
                <View className="bg-[rgb(27,32,39)] w-80 h-48 border border-gray-300 rounded-lg flex items-center justify-center">
                    <View className="w-16 h-16 bg-gray-500 rounded-full mb-4 border border-gray-300 flex items-center justify-center rounded-lg">
                    <Text className="text-[rgb(205,167,123)] font-bold">+19</Text>
                    </View>
                    <Text className="text-white font-bold font">성인 인증</Text>
                    <Text className="text-white text-sm">19세 이상만 이용 가능합니다.</Text>
                </View>
           </TouchableOpacity>
            
        </Container>
        )
    );
}