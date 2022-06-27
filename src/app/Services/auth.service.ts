import {Injectable} from '@angular/core';
import {map, Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthModel} from "../Model/auth.model";
import {UserModel} from "../Model/user.model";
import {ResponseModel} from "../Model/response.model";

// interface User {
//   email: string;
//   password: string;
// }

const LOCALSTORAGE_USER = 'event:user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedUser: UserModel;
  private readonly authUrl: string = environment.baseApi + '/auth';


  constructor(
    private http: HttpClient) {
    if (localStorage.getItem(LOCALSTORAGE_USER)) {
      this.loggedUser = JSON.parse(localStorage.getItem(LOCALSTORAGE_USER));
    }
  }


  get isAuthenticated(): boolean {
    return !!this.loggedUser?.token; // '' true false
  }


  signIn(email: string, password: string): Observable<UserModel> {
    return this.http.post<ResponseModel<UserModel>>(`${this.authUrl}/signIn`, {email, password})
      .pipe(
        map(res => res.data),
        tap(user => {
          this.loggedUser = user
          localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(user))
        })
      )
  }


  signUp(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const authData: AuthModel = {firstName, lastName, email, password}
    return this.http.post(`${this.authUrl}/signUp`, authData)
  }

  signOut(): void {
    this.loggedUser = null;
    localStorage.removeItem(LOCALSTORAGE_USER);
  }
}




