export interface BadgeMenuInterface {
    type: string;
    items: BadgeMenuItemInterface[];
}

export interface BadgeMenuItemInterface {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}