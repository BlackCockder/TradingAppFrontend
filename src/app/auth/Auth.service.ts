import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, switchMap, throwError} from "rxjs";
import {HttpClient, HttpHandlerFn, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
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
    this.setLoggedInFlag(this.getLoggedInFlag());
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
      return throwError(() => new Error("Username not found in the sessionStorage"))
    }

    return this.http.post<RefreshResponse>(`${SERVER_IP}api/auth/refresh/token`, userData, {
      withCredentials: true,
      observe: "response"
    }).pipe(
      map((response: HttpResponse<RefreshResponse>) => {
        if (response.body != null && "authenticationToken" in response.body && typeof response.body.authenticationToken === 'string') {
          this.setAuthToken(response.body.authenticationToken);
          return response.body.authenticationToken;
        } else {
          throwError(() => new Error("Failed to refresh the session"));
          return '';
        }
      }),
      catchError(err => {
        return throwError(() => new Error("User session ended", err));
      })
    );
  }

  public addTokenToReq(req: HttpRequest<any>, jwtToken: string) {
    return req.clone({
      headers: req.headers.set('Authorization',
        'Bearer ' + jwtToken)
    });
  }

  public handleAuthErrors(req: HttpRequest<any>, next: HttpHandlerFn) {
    if (!this.isTokenRefreshingSubject.getValue()) {
      this.isTokenRefreshingSubject.next(true);

      return this.refreshSession().pipe(
        switchMap((refreshTokenResponse: string) => {
          if (refreshTokenResponse) {
            this.isTokenRefreshingSubject.next(false);
            return next(this.addTokenToReq(req, refreshTokenResponse));
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

  public saveRememberMeCredentials(credentials: LoginFormPayload): void {
    localStorage.setItem('rememberMe', JSON.stringify(credentials));
  }

  public getRememberMeCredentials(): LoginFormPayload | null {
    const data: string | null = localStorage.getItem('rememberMe');
    return data ? JSON.parse(data) : null;
  }

  public removeRememberMeCredentials(): void {
    localStorage.removeItem('rememberMe');
  }
}
