import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../_services/user.service';
import { Item } from '../_models/item.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {

  user: any;
  orderList : Item[] = [];

  constructor(private http : HttpClient,
    public userService: UserService) { }

  ngOnInit(): void {
    let id = localStorage.getItem('loggedIn');
    this.userService.getUser(id as unknown as number).subscribe(
      (data:any) => {
        this.user = data;
        let ordersTemp = [];
        ordersTemp = data.orders.split("+");
console.log(ordersTemp);
        for(let i = 0; i < ordersTemp.length; i++) {
          this.orderList.push(ordersTemp[i].split(','));
        }
      }
    );    
  }
}
