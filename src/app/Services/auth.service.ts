import {AuthModel} from "../Model/auth.model";
import {UserModel} from "../Model/user.model";
import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ResponseModel} from "../Model/response.model";
import {map, Observable, Subject, tap} from "rxjs";


const LOCALSTORAGE_USER = 'event:user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logoutSubject = new Subject<boolean>();
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

  // setImg( imageUrl?: string):Observable<any> {
  //   return this.http.put(`${this.authUrl}/update`,imageUrl)
  // }


  signUp(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const authData: AuthModel = {firstName, lastName, email, password}
    return this.http.post(`${this.authUrl}/signUp`, authData)
  }

  signOut(): void {
    this.loggedUser = null;
    localStorage.removeItem(LOCALSTORAGE_USER);
    this.logoutSubject.next(true)

  }
}




