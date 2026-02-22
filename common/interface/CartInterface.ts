export default interface CartInterface {
    id: string;
    tableId?: string;
    items: Array<{
        productId: string;
        productName: string;
        url?: string;
        quantity: number;
        price: number;
    }>;
}