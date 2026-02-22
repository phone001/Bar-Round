import Container from "@/components/common/Contailner";
import { JSX } from "react";
import { useAtomValue } from "jotai";
import { Text, View, StyleSheet,Image ,ImageSourcePropType} from "react-native";
import { cartItemAtom } from "@/common/cartItem";
import { numberFormatter } from "@/util/format";

export default function OrderScreen(): JSX.Element {
    const { tableId, items } = useAtomValue(cartItemAtom);

    console.log("OrderScreen - cartItemAtom:", { tableId, items });
    return (
        <Container>
            <View style={{padding:20}}>
                <Text style={{color:'white',fontSize:24,marginBottom:20}}>{`테이블 번호: ${tableId}`}</Text>
                {items.map((item,index) => (
                    <View key={index} style={styles.listBlock}>
                        <View>
                            <Text style={styles.listTitle}>{`${item.productName}`}</Text>
                            <View style={styles.listBottom}>
                                <Text style={{color:'#ccc', fontSize: 14}}>{`수량: ${item.quantity}`}</Text>
                                <Text style={{color:'#ccc', marginHorizontal: 8}}>|</Text>
                                <Text style={{color:'#ccc', fontSize: 14}}>{`₩${numberFormatter(item.price)}`}</Text>
                            </View>
                        </View>
                        <Text style={styles.totalPrice}>{`₩${numberFormatter(item.price * item.quantity)}`}</Text>
                    </View>
                ))}
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({   
    listBlock:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#333',
        borderRadius:10,
        padding:15,
        marginBottom:10,
    },
    listTitle:{
        color:'white',
        fontSize:18,
        fontWeight:'bold',
        marginBottom: 5,
    },
    listBottom:{
        flexDirection:'row',
    },
    totalPrice: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});