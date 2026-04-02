import {View} from "react-native";

export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <View style={{backgroundColor:"rgb(17,21,26)",flex: 1}} className={className}>
      {children}
    </View>
  );
}