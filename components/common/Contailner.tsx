import {View} from "react-native";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <View style={{backgroundColor:"rgb(17,21,26)",flex: 1}}>
      {children}
    </View>
  );
}