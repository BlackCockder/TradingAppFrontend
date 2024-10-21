import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, switchMap, throwError} from "rxjs";
import {HttpClient, HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {SERVER_IP} from "../../main";
import {RefreshUserData} from "./interfaces/RefreshUserData.interface";
import {RefreshResponse} from "./interfaces/RefreshResponse.interface";
import {LoginFormPayload} from "./interfaces/LoginFormPayload.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isTokenRefreshingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.setSessionCloseEvent();
  }

  public loginUser(loginFormPayload: LoginFormPayload): Observable<boolean> {
    return this.http.post<RefreshResponse>(`${SERVER_IP}api/auth/login`, loginFormPayload, {
      withCredentials: true,
      observe: "response"
    }).pipe(
      map((response: HttpResponse<RefreshResponse>): boolean => {
        if (response.body) {
          this.setAuthToken(response.body.authenticationToken);
          this.setUserID(response.body.id);
          this.setUsername(response.body.username);
          this.setLoggedInFlag(true);
          if(loginFormPayload.rememberMe) {
            this.setUsernameToCache(response.body.username);
          }
          return true;
        }
        return false;
      }),
      catchError(err => {
        return throwError(() => new Error('User failed to log in', err));
      })
    )
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
    sessionStorage.setItem('username', user);
  }

  public getUserName(): string {
    return sessionStorage.getItem('username') ?? '';
  }

  public clearUsername(): void {
    sessionStorage.removeItem('username');
  }

  public setUsernameToCache(user: string): void {
    localStorage.setItem('username', user);
  }

  public getUserNameFromCache(): string {
    return localStorage.getItem('username') ?? '';
  }

  public clearUsernameFromCache(): void {
    localStorage.removeItem('username');
  }

  public setLoggedInFlag(state: boolean): void {
    sessionStorage.setItem('isLoggedInFlag', JSON.stringify(state));
  }

  public getLoggedInFlag(): boolean {
    return (sessionStorage.getItem('isLoggedInFlag') ?? '') === 'true';
  }


  public setAuthToken(token: string): void {
    sessionStorage.setItem("authToken", token);
  }

  public getAuthToken(): string {
    return sessionStorage.getItem('authToken') ?? '';
  }

  public clearAuthToken(): void {
    sessionStorage.removeItem('authToken');
  }

  public authorizationNeeded(): HttpHeaders {
    return new HttpHeaders({'auth-req': 'true'});
  }

  public refreshSession(fromRememberMe: boolean): Observable<RefreshResponse> {
    let userData: RefreshUserData = {
      username: ''
    };

    if(fromRememberMe) {
      if (this.getUserNameFromCache()) {
        userData.username = this.getUserNameFromCache();
      } else {
        return throwError(() => new Error("Username not found in the localStorage"))
      }
    }
    else {
      if (this.getUserName()) {
        userData.username = this.getUserName();
      } else {
        return throwError(() => new Error("Username not found in the sessionStorage"))
      }
    }

    return this.http.post<RefreshResponse>(`${SERVER_IP}api/auth/refresh/token`, userData, {
      withCredentials: true
    })
  }

  public addTokenToReq(req: HttpRequest<any>, jwtToken: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + jwtToken)
    });
  }

  public handleAuthErrors(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    if (!this.isTokenRefreshingSubject.getValue()) {
      this.isTokenRefreshingSubject.next(true);

      return this.refreshSession(false).pipe(
        switchMap((refreshTokenResponse: RefreshResponse) => {
          if (refreshTokenResponse) {
            this.isTokenRefreshingSubject.next(false);
            return next(this.addTokenToReq(req, refreshTokenResponse.authenticationToken));
          } else {
            this.isTokenRefreshingSubject.next(false);
            this.logoutUser();
            throw new Error("User session ended");
          }
        })
      );
    } else {
      throw new Error("Token is refreshing");
    }
  }

  public logoutUser(): void {
    this.clearUsername();
    this.clearAuthToken();
    this.setLoggedInFlag(false);
    this.clearUserID();
    this.clearUsernameFromCache();
  }

  private setSessionCloseEvent(): void {
    window.addEventListener('unload', (): void => {
      this.http.post('http://localhost:8080/api/securedAuth/account/logout', {}, {headers: this.authorizationNeeded()}).subscribe(
        {
          next: (): void => {
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
