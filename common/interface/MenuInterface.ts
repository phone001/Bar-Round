import {SymbolView }  from 'expo-symbols';
import { ComponentProps } from 'react';

type SFSymbolName = ComponentProps<typeof SymbolView>['name'];

export interface MenuProps  {
    name : string,  // 메뉴명
    title: string, // 제목
    icon : SFSymbolName   // 아이콘
}