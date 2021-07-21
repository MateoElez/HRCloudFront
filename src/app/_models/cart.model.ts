export class CartItem {
    itemId: number;
    itemName: string;
    itemPrice: number;
    itemImageUrl: string;
    itemCount: number;

    constructor(itemId: number, itemName:string, itemPrice:number, itemImageUrl:string, itemCount:number) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemImageUrl = itemImageUrl;
        this.itemCount = itemCount;
    }
}