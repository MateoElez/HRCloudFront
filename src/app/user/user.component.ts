import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { Item } from '../_models/item.model';
import { CartItem } from '../_models/cart.model';
import { CartService } from '../_services/cart.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {

  user: any;
  orderList : CartItem[] = [];

  constructor(private http : HttpClient,
    public userService: UserService,
    public cartService: CartService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('loggedin');
    this.userService.getUser(id as unknown as number).subscribe(
      (data:any) => {
        this.user = data;
        console.log("USER: " + this.user.username)
        //console.log("U USERU: " + data.cart[0].itemName);

        console.log("PRovjera 1 ")

        this.http.get('http://localhost:5000/api/Carts/' + id).subscribe((data:any) => {
          let orderedItems = data;
          console.log("PRovjera 2")
          for(let item of orderedItems) {
            this.http.get('http://localhost:5000/api/Items/' + item.id).subscribe((data:any) => {
              let itemO = data;
  
              let order = new CartItem(itemO.id, itemO.itemName
                , itemO.itemPrice, itemO.itemImageUrl, itemO.itemCount);
  
              // order.push(itemO.itemName);
              // order.push(itemO.itemPrice);
              // order.push(itemO.itemImageUrl);
              // order.push(itemO.itemCount);
  
              this.orderList.push(order);
              console.log("PRovjera 3")
              //this.orderList.push(data.id, data.itemName, data.itemPrice, data.itemImageUrl, data.itemCount);
              console.log("PRVI IZ LISTE: " + this.orderList[0].itemName);
            })
          }
        })


        //let ordersTemp = data.cart;
        //ordersTemp = data.cart.split("+");
        //console.log("ORDERS temp: " + ordersTemp);
        // for(let i = 0; i < ordersTemp.length; i++) {
        //   this.orderList.push(ordersTemp[i]);
        // }
        //this.orderList = ordersTemp;
        console.log("Order list: " + this.orderList);
      }
    );    
  }
}
