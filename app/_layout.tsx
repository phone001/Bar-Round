// 전체 레이아웃
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Image } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Text, View } from 'react-native';
import { Background } from '@react-navigation/elements';
// import "/assets/images/main-icon.png";
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
      <View style={{backgroundColor:"rgb(17,21,26)"}}>
        <Text style={{color:"rgb(205,167,123)", fontSize:30, fontWeight:"bold", marginTop:100}}>Bar Round</Text>
      </View>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
