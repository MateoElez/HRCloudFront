import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user.model';
import { UserService } from '../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : User[] = [];

  constructor(public service: UserService,
    private toastr: ToastrService) {
    this.service.getUsers().subscribe(users => this.users=users);
   }

  ngOnInit(): void {
    this.service.refreshList();
  }

  deleteUser(id:number) {
    if(confirm("Are you sure you want to delete User?")){
      this.service.deleteUser(id).subscribe(
        res => {
          this.service.refreshList();
          this.toastr.error('Deleted', 'User List');
        },
        err => { console.log(err); }
      )
    }
    window.location.reload();
  }

  populateForm(user: User) {
    this.service.user = Object.assign({}, user);
  }
   
}
