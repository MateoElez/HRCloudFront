import { CartItem } from "./cart.model";
import { Item } from "./item.model";

export class User {
    id: number = 0;
    username: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    cart: CartItem[] = [];
}
