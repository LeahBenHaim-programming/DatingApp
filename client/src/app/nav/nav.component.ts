import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {

  private loggedInChanged: Subscription;
  isLoggedIn: boolean = false;

  constructor(private accountService: AccountService) { }
  ngOnDestroy(): void {
    this.loggedInChanged.unsubscribe();
  }

  ngOnInit(): void {
    this.loggedInChanged = this.accountService.isLoggedInEvent
      .subscribe((x: boolean) => this.isLoggedIn = x);
  }


  logout() {
    this.accountService.logout();
  }

}
