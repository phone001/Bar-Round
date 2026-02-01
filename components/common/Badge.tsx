import { JSX } from "react";
import { View,Text } from "react-native";

export default function Badge({children}:{children:React.ReactNode}) : JSX.Element  {
    return (
        <View style={{borderColor:"white",borderWidth:1,borderRadius:20,padding:10, alignSelf: 'flex-start'}}>
            <Text style={{color:"white"}}> 
                {children}
            </Text>
        </View>
    );
}