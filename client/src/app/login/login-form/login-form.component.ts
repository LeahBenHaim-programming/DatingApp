import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  model: any = {};
  isLoggedIn: boolean = false;
  private loggedInChanged: Subscription;

  constructor(private accountService: AccountService) { }
  ngOnDestroy(): void {
    this.loggedInChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.setCurrentUser();
    this.loggedInChanged = this.accountService.isLoggedInEvent
      .subscribe((x: boolean) => this.isLoggedIn = x);
  }

  @Output() isLoggedInEvent = new EventEmitter<boolean>();

  setCurrentUser(){
    const user:User=JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }

  login() {
    //observable are new standard for managing async data included in ES7
    //observables ara lazy collction of multiple values over time.
    //use them to stream data:
    //1. HTTP requests
    //2. components wants to observe a value- put these inside a service

    //only subscribers recieve the data.
    //if no one subsribe to observable- they not do anything.

    //observable is lasy- dont do anything untill someone subscribe to.
    this.accountService.login(this.model).subscribe(response => {
      console.log(response)
    },
      error => {
        console.log(error);
      });

  }


  logout() {
    this.accountService.logout();
  }

}
