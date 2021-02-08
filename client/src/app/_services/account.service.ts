import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';


//angular service is singelton: when we inject him into component-
//DI make initialize instance, live untill application dispose.
//and the data we store inside service- it stay there until end of app

//(components are destroyed as soon as they arent in used)

//providedIn- instead of providing in providers[] in app.module

//@Injectable- this service can be injected into other components/ services
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:5001/api/';
  private currentUserSource = new ReplaySubject<User>(1);
  //tyupe of observable-
  currentUser$ = this.currentUserSource.asObservable();

  isLoggedInEvent = new Subject<boolean>();


  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
          this.isLoggedInEvent.next(true);
        }
      })
    );
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          this.currentUserSource.next(user);
          this.isLoggedInEvent.next(true);
        }
      })
    );
  }

  setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }
  logout() {
    localStorage.removeItem("user");
    this.currentUserSource.next(null);
    this.isLoggedInEvent.next(false);
  }

}
