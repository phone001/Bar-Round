// 전체 레이아웃
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css";
import { Image, Platform, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Text, View } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useAtomValue } from 'jotai';
import { cartItemAtom } from '@/common/cartItem';
import { useEffect, useState } from 'react';
import CartList from '@/components/cart-list';
import { requestMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [count,setCount] = useState(0);
  const [isCartOpen,setIsCartOpen] =useState<boolean>(false);
  const cartItem = useAtomValue(cartItemAtom);

  const handleCartOpen=()=>{
    setIsCartOpen(!isCartOpen);
  }

  const requestCameraPermission = async (): Promise<boolean> => {
  try {
    const results = await requestMultiple([
      Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    ]);

    return results[Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA] === RESULTS.GRANTED;
  } catch (error) {
    console.error(error);
    return false;

  }
}

  // 앱이 처음 로드될 때 카메라 권한 요청 함수 실행
  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    const totalCount = cartItem.items?.reduce((acc, item) => acc + item.quantity, 0);
    setCount(totalCount);
  },[cartItemAtom]);


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View className='bg-[rgb(17,21,26)] flex-row ralative' >
          <Image source={require('@/assets/images/main-icon.png')} style={{width:60,height:70,marginTop:80}}/>
          <Text style={{color:"rgb(205,167,123)", fontSize:30, fontWeight:"bold", marginTop:100}}>Bar Round</Text>
          <TouchableOpacity className='absolute w-10 h-10 items-center justify-center right-5 bottom-5' onPress={handleCartOpen}>
            <IconSymbol name="cart" size={30} color="rgb(205,167,123)" />
            {
              count > 0 &&<Text className='w-5 absolute bg-red-500 border text-white text-xs rounded-full top-0 right-0 text-center'>{count}</Text>
            }
          </TouchableOpacity>
        </View>
        <CartList isOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
