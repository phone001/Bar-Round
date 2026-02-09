import {BadgeMenuInterface} from "./interface/BadgeMenuInterface";

export const badgeMenuData: BadgeMenuInterface[] = [
    {
        type: "칵테일",
        items: [
            {
                id: 1,
                name: "미도리사워",
                price: 9000,
                imageUrl: require("@/assets/images/drink/midori.png"),
                description: "미도리 사워는 일본산 멜론 리큐어인 미도리를 베이스로 한 상큼하고 달콤한 칵테일",
                ingredients: ["미도리 리큐어", "레몬 주스", "설탕 시럽", "얼음"]
            }]
    },{
        type: "위스키",
        items: [
            {
                id: 2,
                name: "맥켈란",
                price: 120000,
                imageUrl: require("@/assets/images/drink/macallan.png")
            },{
                id: 3,
                name: "조니워커",
                price: 100000,
                imageUrl: require("@/assets/images/drink/JohnnieWalke.png")
            },{
                id: 4,
                name: "발베니",
                price: 100000,
                imageUrl: require("@/assets/images/drink/balvenie.png")
            }]
    }
];