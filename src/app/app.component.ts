import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './_services/user.service';
import { AuthenticationService } from './_services/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProjectApp';


  constructor(
    private router: Router,
    public userService: UserService,
    public authenticationService: AuthenticationService
  ) {
  }

  logout() {
    this.authenticationService.logout();
  }
}
