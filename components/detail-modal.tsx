import { BadgeMenuItemInterface } from '@/common/interface/BadgeMenuInterface';
import { View,  StyleSheet,Text, TouchableOpacity, Image, ImageSourcePropType,TextInput} from 'react-native';
import SliderUpView from '@/components/ui/slider-up';
import { useState } from 'react';
import {Ionicons} from '@expo/vector-icons'

export default function DetailScreen({item,setIsShowDetail}:{item:BadgeMenuItemInterface,setIsShowDetail:React.Dispatch<React.SetStateAction<boolean>>}) {
    const [quantity, setQuantity] =  useState<string>("1");
    const numberFormatter = new Intl.NumberFormat('ko-KR');

    const setQuantityValue=(value:string)=>{
        setQuantity(value);
    }

    const handelCancel=()=>{
        setIsShowDetail(false);
    }

    return (
        <SliderUpView>
            <Image source={item.imageUrl as ImageSourcePropType} style={{width:200,height:200,resizeMode:'contain',marginBottom:20}}/>
            <Text style={[styles.text,{color:'white',fontSize:32,fontWeight:'bold'}]}>{item.name}</Text>
            
            <Text style={[styles.text,{color:'white',fontSize:24,marginTop:10,marginBottom:20}]}>{numberFormatter.format(item.price)}원</Text>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
                <TextInput keyboardType="numeric" style={styles.input} value={quantity} placeholder="수량" onChangeText={(text)=>setQuantity(text)}/> 
                <TouchableOpacity onPress={() => setQuantityValue((parseInt(quantity) + 1).toString())}>
                    <Ionicons name="add" size={24} color="white" style={styles.calculateIcon}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setQuantityValue((parseInt(quantity) - 1).toString())}>
                    <Ionicons name="remove" size={24} color="white" style={styles.calculateIcon}/>
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                <TouchableOpacity onPress={handelCancel} style={styles.BtnAlign}>
                    <Text style={[styles.text,styles.Btn,{backgroundColor:'#c0c0c0'}]}>닫기</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => console.log("추가")}>
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
    width:100,
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
  input:{
    borderColor:'gray',
    borderRadius:5,
    paddingLeft:5,
    borderWidth:1,
    width:100,
    height:40,
    color:'white',
    fontSize:18,
  },
  calculateIcon:{
    borderRadius:5,
    borderWidth:1,
    borderColor:'gray',
    padding:5,
  }

});