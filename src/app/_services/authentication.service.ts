import { Injectable } from '@angular/core';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public currentUser: User = new User;

  constructor(private http: HttpClient,
    private router: Router) {}

  loggedin = function() {
    if(localStorage.getItem('loggedin') !== null && localStorage.getItem('loggedin') !== undefined) {
      return true;
    } else
    return false;
  }

  login(id: number) {
      console.log("PRIJAVIA san se!");
      localStorage.setItem('loggedin', id as unknown as string);
      this.router.navigate(['/']);
  }
  
  logout() {
    localStorage.removeItem('loggedin');
    this.router.navigate(['/']);
  }
}
