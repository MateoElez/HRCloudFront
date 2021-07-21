import { Component, OnInit } from '@angular/core';
import { CartItem } from '../_models/cart.model';
import { Item } from '../_models/item.model';
import { ItemService } from '../_services/item.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  errors:any[] = [];
  notEmpty: boolean = false;
  key:any;
  countItem: any;

  constructor(public itemSerive: ItemService) { }

  ngOnInit(): void {
    
    for(let i=0; i < localStorage.length; i++) {
      this.key = localStorage.key(i);

      if(this.key != null && this.key != undefined) {
        console.log("Key is:" + localStorage.getItem(this.key));
        this.countItem = localStorage.getItem(this.key);
        this.notEmpty = true;
        this.itemSerive.getItem(this.key).subscribe(res => {
          //this.cartItems.push(res);
          let itemId = res.itemId;
          let itemName = res.itemName;
          let itemPrice = res.itemPrice;
          let itemImageUrl = res.itemImageUrl;

          this.cartItems.push(new CartItem(itemId, itemName, itemPrice, itemImageUrl, parseInt(this.countItem)))
        })
      }
    }
  }

  plusFunction(id: number) {

  }

  minusFunction(id: number) {

  }

  // checking if cart is empty
  notEmptyFunction() {
    if(this.notEmpty) {
      return true;
    }
    return false;
  }
}
