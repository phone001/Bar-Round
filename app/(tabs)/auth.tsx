import Container from "@/components/common/Contailner";
import { JSX } from "react";
import { useAtomValue } from "jotai";
import { Text, View, StyleSheet,Image ,ImageSourcePropType} from "react-native";
import { cartItemAtom } from "@/common/cartItem";
import { numberFormatter } from "@/util/format";

export default function AuthScreen(): JSX.Element {
    const { tableId, items } = useAtomValue(cartItemAtom);

    console.log("AuthScreen - cartItemAtom:", { tableId, items });
    return (
        <Container className="justify-center items-center">
           <View className="bg-red-500  w-10">
            <Text>test</Text>
           </View>
        </Container>
    )
}

const styles = StyleSheet.create({   
  card:{
    width: 300,
    height: 200,
    backgroundColor: '#333',
  }
});