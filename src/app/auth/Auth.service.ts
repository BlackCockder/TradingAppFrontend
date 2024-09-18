import { Injectable } from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of, switchMap} from "rxjs";
import {HttpClient, HttpHandlerFn, HttpHeaders, HttpRequest} from "@angular/common/http";
import {serverIP} from "../../main";
import {RefreshUserData} from "./interfaces/RefreshUserData.interface";
import {RefreshResponse} from "./interfaces/RefreshResponse.interface";
import {StateManagerService} from "../shared/globalServices/StateManager.service";
import {LoginFormPayload} from "./interfaces/LoginFormPayload.interface";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isTokenRefreshingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private stateMangerService: StateManagerService) {
    this.setLoggedInFlag(this.getLoggedInFlag());
    this.setSessionCloseEvent();
  }


  public loginUser(loginFormPayload: LoginFormPayload): Observable<any> {
    return this.http.post(`${serverIP}api/auth/login`, loginFormPayload, {
      observe: "response",
      withCredentials: true
    });
  }


  public setUserID(ID: number): void {
    sessionStorage.setItem("userid", JSON.stringify(ID));
  }


  public getUserID(): number {
    return Number(sessionStorage.getItem("userid"));
  }


  public clearUserID(): void {
    sessionStorage.removeItem("userid");
  }


  public setUsername(user: string): void {
    sessionStorage.setItem('username', JSON.stringify(user));
  }


  public getUserName(): string {
    return sessionStorage.getItem("username") ? JSON.parse(sessionStorage.getItem("username")) : '';
  }


  public clearUsername(): void {
    sessionStorage.removeItem('username');
  }


  public setLoggedInFlag(state: boolean): void {
    sessionStorage.setItem('isLoggedInFlag', JSON.stringify(state));
  }


  public getLoggedInFlag(): boolean {
    return JSON.parse(sessionStorage.getItem('isLoggedInFlag')) === 'true';
  }


  public setAuthToken(token: string): void {
    sessionStorage.setItem("authToken", JSON.stringify(token));
  }


  public getAuthToken(): string {
    return sessionStorage.getItem("authToken") ? JSON.parse(sessionStorage.getItem("authToken")) : '';
  }


  public clearAuthToken(): void {
    sessionStorage.removeItem('authToken');
  }


  public authorizationNeeded() {
    return new HttpHeaders({'auth-req': 'true'});
  }


  public refreshSession(): Observable<string> {
    let userData: RefreshUserData = {
      username: ''
    };

    if (this.getUserName()) {
      userData.username = this.getUserName();
    } else {
      return of('');
    }

    return this.http.post<RefreshResponse>("http://localhost:8080/api/auth/refresh/token", userData, {
      withCredentials: true,
      observe: "response"
    }).pipe(
      map(response => {
          if ("authenticationToken" in response.body) {
            this.setAuthToken(response.body.authenticationToken);
            return response.body.authenticationToken;
          }
          else {
            console.error("An unknown error has occurred, report it immediately!");
            return '';
        }
      }),
      catchError(err => {
        console.error("User session ended!");
        console.error(err);
        return '';
      })
    );
  }


  public addTokenToReq(req: HttpRequest<any>, jwtToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + jwtToken)
    });
  }


  public checkForAuthorisationRequest(req: HttpRequest<any>): boolean {
    return req.headers.get("X-auth-req") === 'true'
  }
    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandlerFn) {
    if (!this.isTokenRefreshingSubject.getValue()) {
      this.isTokenRefreshingSubject.next(true);
      return this.refreshSession().pipe(
        switchMap((refreshTokenResponse: string) => {
          if (refreshTokenResponse) {
            this.isTokenRefreshingSubject.next(false);
            return next(this.addTokenToReq(req, refreshTokenResponse));
          } else {
            this.isTokenRefreshingSubject.next(false);
            this.logoutUser()
            throw new Error("User session ended");
          }
        })
      )
    } else {
      throw new Error("Token is refreshing");
    }
  }


  public logoutUser(): void {
    this.clearUsername();
    this.clearAuthToken();
    this.setLoggedInFlag(false);
    this.clearUserID();
  }


  private setSessionCloseEvent() {
    window.addEventListener('unload', () => {
      this.http.post<any>('http://localhost:8080/api/securedAuth/account/logout', {}, {headers: this.authorizationNeeded()}).subscribe(
        {
          next: () => {
            console.log('Session end');
          },
          error: err => {
            console.log(err);
          }
        }
      );
    });
  }


}
