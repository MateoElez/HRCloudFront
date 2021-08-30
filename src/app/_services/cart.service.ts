import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartItem } from '../_models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  readonly baseURL = "http://localhost:5000/api/Carts/"
 // public cartItem: CartItem = new CartItem;
  public cartItemList: CartItem[] = [];

  constructor(private http: HttpClient) { }



  getCartItemList(id: number) {
    return this.http.get<CartItem>(this.baseURL + id + '/list');
  }

  postCartItem(id: number) {
   // return this.http.post<CartItem>(this.baseURL, this.cartItem);
  }
}
