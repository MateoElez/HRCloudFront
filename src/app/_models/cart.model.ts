export class CartItem {
    id: number;
    itemName: string;
    itemPrice: number;
    itemImageUrl: string;
    itemCount: number;

    constructor(id: number, itemName:string, itemPrice:number, itemImageUrl:string, itemCount:number) {
        this.id = id;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemImageUrl = itemImageUrl;
        this.itemCount = itemCount;
    }
}