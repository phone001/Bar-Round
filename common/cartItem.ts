import CartInterface from "./interface/CartInterface";
import jotai from "jotai";

export const cartItemAtom = jotai.atom<CartInterface>({
    id: '',
    tableId: undefined,
    items: []
});