import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  model: any = {};
  isLoggedIn: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
  }

  login() {

    //observable is lasy- dont do anything untill someone subscribe to.
    this.accountService.login(this.model).subscribe(response => {
      console.log(response)
      this.isLoggedIn = true;
    },
      error => console.log(error));
  }


  logout(){
    this.isLoggedIn=false;
  }
  // getUsers() {
  //   this.accountService.getUsers().subscribe(res => console.log(res), err => console.log(err))
  // }
}
