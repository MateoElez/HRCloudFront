export class CartItem {
    id: number = 0;
    itemName: string = '';
    itemPrice: number = 0;
    itemImageUrl: string = '';
    itemCount: number = 0;

    constructor(id: number, itemName:string, itemPrice:number, itemImageUrl:string, itemCount:number) {
        this.id = id;
        this.itemName = itemName;
        this.itemPrice = itemPrice;
        this.itemImageUrl = itemImageUrl;
        this.itemCount = itemCount;
    };
    
}