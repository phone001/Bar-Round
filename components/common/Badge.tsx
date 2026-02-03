import { JSX } from "react";
import { View,Text, TouchableOpacity } from "react-native";

export default function Badge({setType,children}:{setType:(type:string)=>void,children:React.ReactNode}) : JSX.Element  {
    return (
        <TouchableOpacity onPress={() => setType(children as string)}>
            <View style={{borderColor:"white",borderWidth:1,borderRadius:20,padding:10, alignSelf: 'flex-start'}}>
                <Text style={{color:"white"}}> 
                    {children}
                </Text>
            </View>
        </TouchableOpacity>
    );
}