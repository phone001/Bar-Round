import { BadgeMenuInterface } from '@/common/interface/BadgeMenuInterface';
import { View, Animated, StyleSheet,Text, Dimensions} from 'react-native';
import { useRef,useEffect,ReactNode } from 'react';

export default function SliderUpView({children}:{children:ReactNode}) {
    const translateY = useRef(new Animated.Value(100)).current;

    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.parallel([ 
            Animated.spring(translateY, {
                toValue: 0, 
                useNativeDriver: true, 
                bounciness: 8, 
                speed: 12, 
            }),
            Animated.timing(opacity, {
                toValue: 1, 
                duration: 500, 
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    return (
        <View style={styles.container} >
            <Animated.View
                style={[
                    styles.box,
                    {
                        transform: [{ translateY: translateY }],
                        opacity: opacity,
                    },
                ]}
            >
                {children}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.4)', // 반투명 배경
        position: 'relative',
    },
    box: {
        position: 'absolute',
        bottom:0,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height*0.74,
        backgroundColor: 'rgb(29, 35, 44)', // Bar Round 앱 컨셉 컬러 예시
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        elevation: 5, // 안드로이드 그림자
        shadowColor: '#000', // iOS 그림자
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
});