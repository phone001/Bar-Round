export default interface CartInterface {
    id: string;
    tableId?: string;
    items: Array<{
        productId: string;
        quantity: number;
        price: number;
    }>;
}