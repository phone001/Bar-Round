import { ReactNode, useEffect, useRef } from "react";
import { Animated, StyleSheet, Dimensions} from "react-native"

export default function SliderLeft({isOpen,children}:{isOpen:boolean,children:ReactNode}){
    
    const { width } = Dimensions.get('window');
    const fadeAnim = useRef(new Animated.Value(width)).current;
    const fadeIn = () => {
        Animated.timing(fadeAnim,{
            duration:300,
            toValue:0,
            useNativeDriver:true,
        }).start();
    }
    const fadeOut = ()=> {
        Animated.timing(fadeAnim,{
            duration:300,
            toValue:width,
            useNativeDriver:true,
        }).start();
    }

   useEffect(() => {
        if (isOpen) {
           fadeIn();
        } else {
            // 닫힐 때: 화면 밖으로 슬라이드 (translateX: width)
           fadeOut();
        }
    }, [isOpen]);

    return (
        <Animated.View style={[styles.container,{transform: [{ translateX: fadeAnim }]}]}>
            {children}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container :{
        position:'absolute',
        zIndex: 1000,
        left:0,
        top:150,
        bottom:0,
        width:'100%',
        height:'100%', 
        backgroundColor:'rgb(29, 35, 44)',

    }
});