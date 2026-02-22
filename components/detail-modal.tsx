import { BadgeMenuItemInterface } from '@/common/interface/BadgeMenuInterface';
import { View,  StyleSheet,Text, TouchableOpacity, Image, ImageSourcePropType,TextInput, Dimensions} from 'react-native';
import SliderUpView from '@/components/ui/slider-up';
import { use, useEffect, useState } from 'react';
import {Ionicons} from '@expo/vector-icons'
import Badge from './common/Badge';
import { useSetAtom } from 'jotai';
import { cartItemAtom } from '@/common/cartItem';

export default function DetailScreen({item,setIsShowDetail}:{item:BadgeMenuItemInterface,setIsShowDetail:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [quantity, setQuantity] =  useState<string>("1");
    const numberFormatter = new Intl.NumberFormat('ko-KR');

    const setCart = useSetAtom(cartItemAtom);

    const setQuantityValue=(value:number)=>{
        setQuantity(value.toString());
    }

    const handleCartAdd=()=>{
        setCart((prevCart)=>{
            const existingItemIndex = prevCart.items.findIndex(cartItem => cartItem.productId === item.id.toString());
            let updatedItems = [...prevCart.items];

            if (existingItemIndex >= 0) {
                // 이미 장바구니에 있는 경우 수량 업데이트
                updatedItems[existingItemIndex].quantity += parseInt(quantity);
            } else {
                // 장바구니에 없는 경우 새 항목 추가
                updatedItems.push({
                    productId: item.id.toString(),
                    productName: item.name,
                    url: item.imageUrl,
                    quantity: parseInt(quantity),
                    price: item.price,
                });
            }

            return {
                ...prevCart,
                items: updatedItems,
            };
        });
        setIsShowDetail(false);
    };

    const handleCancel=()=>{
        setIsShowDetail(false);
    }

    return (
        <SliderUpView>
            <Image source={item.imageUrl as ImageSourcePropType} style={{width:200,height:200,resizeMode:'contain',marginBottom:20}}/>
            <Text style={[styles.text,{color:'white',fontSize:32,fontWeight:'bold'}]}>{item.name}</Text>
            
            <Text style={[styles.text,{color:'white',fontSize:24,marginTop:10,marginBottom:20}]}>{`₩${numberFormatter.format(item.price)}`}</Text>
            
            <View style={{width:'80%',marginBottom:20, }}>
                <Text style={{color:'white',fontSize:16,fontWeight:'bold'}}>{item.description}</Text>
            </View>
            <View style={styles.ingredient}>
              {item.ingredients?.map((ingredient, index) => (
                <Badge key={index} setType={()=>{}}>{ingredient}</Badge>
              ))}
            </View>
            
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',gap:10,width:'100%'}}>
                <TouchableOpacity onPress={() => setQuantityValue(Math.max(1, parseInt(quantity) - 1))}>
                    <Ionicons name="remove" size={24} color="white" style={styles.calculateIcon}/>
                </TouchableOpacity>

                <Text  style={[styles.quantity,{width:'50%'}]}>{quantity}</Text> 
                
                <TouchableOpacity onPress={() => setQuantityValue(parseInt(quantity) + 1)}>
                    <Ionicons name="add" size={24} color="white" style={styles.calculateIcon}/>
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                <TouchableOpacity onPress={handleCancel} style={styles.BtnAlign}>
                    <Text style={[styles.text,styles.Btn,{backgroundColor:'#c0c0c0'}]}>닫기</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleCartAdd}>
                    <Text style={[styles.text,styles.Btn]}>담기</Text>
                </TouchableOpacity>
            </View>
        </SliderUpView>
    );
}

const styles = StyleSheet.create({   
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#121212',
  },
  box:{
    flexDirection:'row',
    marginTop:30,
  },
  Btn:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#6395ff',
    width: Dimensions.get('window').width/2.5,
    height:40,
    textAlign:'center',
    lineHeight:40,
    borderRadius:5,
    margin: 5,
  },
  BtnAlign:{
    justifyContent:'center',
    alignItems:'center',
  },
  quantity:{
    borderColor:'gray',
    borderRadius:5,
    paddingLeft:5,
    borderWidth:1,
    width:'80%',
    height:40,
    color:'white',
    fontSize:18,
    textAlign:'center',
    lineHeight:40,
  },
  calculateIcon:{
    borderRadius:5,
    borderWidth:1,
    borderColor:'gray',
    padding:5,
  },
  ingredient:{
    width:'80%',
    height:100,
    color:'white',
    fontSize:16,
    marginBottom:20,
    backgroundColor:'gray',
    padding:10,
    borderRadius:5,
    flexDirection:'row',
    flexWrap:'wrap',
    gap:5,
  }
});