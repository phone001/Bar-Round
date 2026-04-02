import { SlideInLeft } from "react-native-reanimated";
import {Button, Text,TouchableOpacity,View} from "react-native";
import SliderLeft from "./ui/slider-left";
import { use } from "react";
import { useAtomValue } from "jotai";
import { cartItemAtom } from "@/common/cartItem";

export default function CartList({isOpen,setIsCartOpen}:{isOpen:boolean,setIsCartOpen:React.Dispatch<React.SetStateAction<boolean>>}){
    const cartItem = useAtomValue(cartItemAtom);

   return (        
        <SliderLeft isOpen={isOpen}>
            <View className="flex flex-col justify-center items-center">
                <Text className="text-2xl font-bold text-white">카트</Text>

                <View className="flex flex-row justify-evenly">
                    <TouchableOpacity 
                        className="border rounded-md bg-white w-40 h-10 flex flex-row justify-center items-center mt-5"
                        onPress={()=>{
                            setIsCartOpen(false);
                        }}>
                        <Text className="font-bold">취소</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="border rounded-md bg-white w-40 h-10 flex flex-row justify-center items-center mt-5">
                        <Text className="font-bold">주문하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SliderLeft>
   );
}