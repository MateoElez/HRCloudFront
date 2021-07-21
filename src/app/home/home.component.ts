import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = new User;

  constructor( public userService: UserService, 
    public authenticationService : AuthenticationService) {
    this.userService.getUser(localStorage.getItem('loggedin') as unknown as number)
          .subscribe((res) => this.user = res)
   }

  ngOnInit(): void {
  }

}
