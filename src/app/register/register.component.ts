import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user.model';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent implements OnInit {

  submitted = false;
  errors:any[] = [];

  constructor(
    public service: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm, event:any) {
    if(this.service.user.id == 0) {
      this.insertRecord(form, event);
    } else
      this.updateRecord(form);
  }

  usernameUsed = false;


  insertRecord(form: NgForm, event: any) {
    event.preventDefault();
    this.submitted = true;
    const username = event.target.querySelector('#username').value;
    console.log(username);

    this.service.getUsers().subscribe((data: any) => {
      this.errors = [];
      for(let user of data) {
        if(user.username == username){
          this.usernameUsed = true;
          this.errors.push("Username is already in use!!");
          this.resetForm(form);
          break;
        } else {
        }
      }  
    });

    if(this.usernameUsed){
    this.service.postUser().subscribe(
      () => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.success('Inserted', 'User List');
      },
      err => { console.log(err); }
    ) }

   
  }

  updateRecord(form: NgForm) {
    this.service.putUser(new User()).subscribe(
      res => {
        this.resetForm(form);
        this.service.refreshList();
        this.toastr.info('Updated', 'User List');
      }, err => { console.log(err); }
    )
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.service.user = new User();
  }

}
