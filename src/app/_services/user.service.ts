import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseURL = "http://localhost:5000/api/User/";
  public user: User = new User();

  public userList: User[] = [];


  constructor(private http: HttpClient) {}
  
  refreshList() {
    this.http.get<User[]>(this.baseURL).toPromise()
    .then(res => this.userList = res);
  }


  getUser(id: number) {
    return this.http.get<User>(this.baseURL + id);
  }

  getUsers() {
    return this.http.get<User[]>(this.baseURL);
  }

  postUser() {
    return this.http.post(this.baseURL, this.user);
  }
  deleteUser(id:number) {
    return this.http.delete(this.baseURL + id);
  }
  putUser(user: User) {
    return this.http.put(this.baseURL + localStorage.getItem('loggedin'), user);
  }
}
