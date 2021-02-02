import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (response) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem("user");
  }


}
