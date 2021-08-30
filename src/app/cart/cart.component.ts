import { Component, OnInit } from '@angular/core';
import { CartItem } from '../_models/cart.model';
import { Item } from '../_models/item.model';
import { ItemService } from '../_services/item.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[] = [];
  currentUserId : any;
  totalPrice: number = 0;
  errors:any[] = [];
  notEmpty: boolean = false;
  key:any;
  countItem: any;

  constructor(public itemSerive: ItemService,
    public userService : UserService,
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
          let id = data.id;
          let itemName = data.itemName;
          let itemPrice = data.itemPrice;
          let itemImageURL = data.itemImageUrl;

          this.totalPrice += this.countItem * itemPrice;
          this.cartItems.push(new CartItem(id, itemName, itemPrice, itemImageURL, parseInt(this.countItem)));
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
    //console.log("STARA:"  + lsValue);
    let lsValueNum = parseInt(lsValue as string);
    let lsValueNumNew = lsValueNum - 1;
    
    //console.log("Nova: " + lsValueNumNew);
    if(lsValueNumNew == 0) {
      localStorage.removeItem(id as unknown as string);
    }  else {
    localStorage.setItem(id as unknown as string, lsValueNumNew as unknown as string);
    }
    location.reload();
  }

  buy(event:any) {
    event.preventDefault();

    
    let userLoggedIn = localStorage.getItem('loggedin');
    //let itemsToOrder : any[]= [];
    this.userService.getUser(userLoggedIn as unknown as number)
    .subscribe((data:any) => {
      this.currentUserId = data.Id;

      
      for(let item of this.cartItems) {
        console.log("ude li ode u for u cartu...");
        this.http.post('http://localhost:5000/api/Carts/', {
        id: this.currentUserId,
        cartItems: [{id: item.id, quantity: item.itemCount }]
      }).subscribe(data => alert("Order succesfull!"));
        
      }

      this.http.get('http://localhost:5000/api/Carts/' + data.id).subscribe(
        data => console.log("DATA: " + data)
      )

      //data.cart = this.cartItems;
      //console.log("prvi proizvod: " + data.cart[0].itemName)
      // let allOrders = data.cart;

      // document.querySelectorAll('item-container').forEach((value, key) => {
      //   console.log(value);

      //   let item = (document.querySelector('#item'))?.textContent;
      //   let price = (document.querySelector('#price'))?.textContent;
      //   let count = (document.querySelector('#count'))?.textContent;

      //   //itemsToOrder += [item, price, count] + "+";
      // });
      //allOrders += itemsToOrder;

      //dobro je sve za sad, samo fali to da u backend upisen 
      // cart, odnosno sve proizvode iz kosarice
      // this.userService.putUser({
      //   id: data.id,
      //   username: data.username,
      //   password: data.password,
      //   firstName: data.firstName,
      //   lastName : data.lastName,
      //   cart: data.cart
      // }).subscribe((data:any) => {
      //   console.log("Prodes li do ode u for petlji");
      //   for(let i = 0; i < this.cartItems.length; i++) {
      //     console.log("U for PETLJI: " + this.cartItems[i].itemName);
      //     data.cart.push(this.cartItems[i]);
      //   }
      // });
    });

    // this.userService.putUser().subscribe((data:any) => {
    //   for(let i = 0; i < this.cartItems.length; i++) {
    //     console.log("U FOR petlji: " + this.cartItems[i].itemName);
    //     data.cart.push(this.cartItems[i]);
    //   }
    // })

    
    localStorage.clear();
    localStorage.setItem('loggedin', userLoggedIn as string);
  }

  // checking if cart is empty
  notEmptyFunction() {
    if(this.notEmpty) {
      return true;
    }
    return false;
  }
}
