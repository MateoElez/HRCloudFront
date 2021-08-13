import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { Item } from '../_models/item.model';
import { CartItem } from '../_models/cart.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {

  user: any;
  orderList : CartItem[] = [];

  constructor(private http : HttpClient,
    public userService: UserService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('loggedin');
    this.userService.getUser(id as unknown as number).subscribe(
      (data:any) => {
        this.user = data;
        console.log("USER: " + this.user.username)
        //console.log("U USERU: " + data.cart[0].itemName);
        let ordersTemp = data.cart;
        //ordersTemp = data.cart.split("+");
        console.log("ORDERS temp: " + ordersTemp);
        // for(let i = 0; i < ordersTemp.length; i++) {
        //   this.orderList.push(ordersTemp[i]);
        // }
        this.orderList = ordersTemp;
        console.log("Order list: " + this.orderList);
      }
    );    
  }
}
