import { Component, OnInit } from '@angular/core';
import { CartItem } from '../_models/cart.model';
import { Item } from '../_models/item.model';
import { ItemService } from '../_services/item.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(public itemSerive: ItemService,
    public http: HttpClient,
    public router : Router) { }

  ngOnInit(): void {
    
    for(let i=0; i < localStorage.length; i++) {
      this.key = localStorage.key(i);

      if(this.key != null && this.key != undefined && !isNaN(parseInt(this.key))) {
        this.countItem = localStorage.getItem(this.key);
        this.notEmpty = true;
        
        this.http.get('http://localhost:5000/api/Items/' + this.key).subscribe((data: any) => {
          this.key = localStorage.key(i);
          this.countItem = localStorage.getItem(this.key);
          let itemId = data.itemId;
          let itemName = data.itemName;
          let itemPrice = data.itemPrice;
          let itemImageURL = data.itemImageUrl;

          this.totalPrice += this.countItem * itemPrice;          
          this.cartItems.push(new CartItem(itemId, itemName, itemPrice, itemImageURL, parseInt(this.countItem)));
        });
       }
      }
    
  }

  plusFunction(id: number) {
    let lsValue = localStorage.getItem(id as unknown as string);
    let lsValueNum = parseInt(lsValue as string);
    let lsValueNumNew = lsValueNum + 1;
    
    
    localStorage.setItem(id as unknown as string, lsValueNumNew as unknown as string);
    location.reload();
  }

  minusFunction(id: number) {
    let lsValue = localStorage.getItem(id as unknown as string);
    console.log("STARA:"  + lsValue);
    let lsValueNum = parseInt(lsValue as string);
    let lsValueNumNew = lsValueNum - 1;
    
    console.log("Nova: " + lsValueNumNew);
    if(lsValueNumNew == 0) {
      localStorage.removeItem(id as unknown as string);
    }  else {
    localStorage.setItem(id as unknown as string, lsValueNumNew as unknown as string);
    }
    location.reload();
  }

  buy() {
    
    let isLoggedIn = localStorage.getItem('loggedin');
    localStorage.clear();
    localStorage.setItem('loggedin', isLoggedIn as string);
  }

  // checking if cart is empty
  notEmptyFunction() {
    if(this.notEmpty) {
      return true;
    }
    return false;
  }
}
