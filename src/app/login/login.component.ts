import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../_models/user.model';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  errors:any[] = [];
  submitted = false;
  //loggedin = false;

  constructor(
    public authenticationService :AuthenticationService,
    public userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  onSubmit(event: any) {
    let users;
    event.preventDefault();
    const username = event.target.querySelector('#username').value;
    const password = event.target.querySelector('#password').value;

    this.userService.getUsers().subscribe((data:any) => {
      users = data;
      this.errors = [];
      let usernameCorrect = false;
      for(let user of users) {
        if(user.username == username){
          usernameCorrect = true;
          if(user.password == password){
            this.authenticationService.login(user.id);
            this.router.navigate(['/']);
          } else 
            this.errors.push("Netočna lozinka!");
        } 
      }
      if(!usernameCorrect)
        this.errors.push("Ne postoj itaj Username!!");
    })
  }
}
