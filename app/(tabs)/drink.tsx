import Badge from "@/components/common/Badge";
import Container from "@/components/common/Contailner";

import {badgeMenuData} from "@/common/badgeitem";
import { BadgeMenuInterface,BadgeMenuItemInterface } from "@/common/interface/BadgeMenuInterface";
import { Dimensions, Image, ImageSourcePropType, ScrollView, Text, TouchableOpacity, View } from "react-native";
import {useState,useEffect} from "react";
import DetailScreen from "@/components/detail-modal";
import { useGetDrinkList } from "@/hooks";
import { DrinkItem } from "@/types/drink";

export default function DrinkScreen() {
    const [type, setType] =  useState<string>("");
    const [drinkItems, setDrinkItems] = useState<BadgeMenuItemInterface[]>([]);
    const [selectItem, setSelectItem] = useState<DrinkItem|null>(null);
    const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
    const screenWidth = Dimensions.get('window').width;
    const numColumns = 2;
    const gap = 10; // 아이템 사이 간격

    const {drinkList} = useGetDrinkList(type);

    // (전체너비 - 양옆 여백 - 아이템 사이 간격) / 개수
    const itemWidth = (screenWidth - (gap * 3)) / numColumns;

    const showDetail=(drink: DrinkItem)=>{
        console.log("선택된 음료:", drink);
        setSelectItem(drink);
        setIsShowDetail(true);
    };


    // type이 변경될 때마다 drinkItems 업데이트
    useEffect(() => {
        if (type === "전체" || !type) {
            setDrinkItems(badgeMenuData.flatMap(item => item.items));
        } else {
            const selectedMenu = badgeMenuData.find(item => item.type === type);
            setDrinkItems(selectedMenu ? selectedMenu.items : []);
        }
    }, [type]);


    return (
        <Container>
            <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
                <Badge setType={setType}>전체</Badge>
                {badgeMenuData.map((badgeMenu:BadgeMenuInterface,index:number) => <Badge key={index} setType={setType}>{badgeMenu.type}</Badge>)}
            </View>
            <ScrollView contentContainerStyle={{flexWrap:'wrap',flexDirection:'row',padding:10}}>
                {drinkList?.map((item:DrinkItem,index:number) => {
                    return (
                        <TouchableOpacity key={item.orderId} onPress={() => showDetail(item)}>
                            <View style={{width:itemWidth,justifyContent:'center',alignItems:'center',borderColor:'white',borderWidth:1,marginBottom:10}}>
                                <Image source={item.imageUrl as ImageSourcePropType} style={{width:itemWidth-20,height:itemWidth-20,resizeMode:'contain',marginTop:10}}/>
                                <Text style={{color:"white",margin:10}}>{item.name}</Text>
                                <Text style={{color:"white"}}>{item.price}</Text>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            {selectItem && isShowDetail && (
                <DetailScreen item={selectItem} isOpen={isShowDetail} setIsShowDetail={setIsShowDetail}/>
            )}   
        </Container>
    )
}