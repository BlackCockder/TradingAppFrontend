import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "../../auth/Auth.service";

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {
  private loggedInSubject: BehaviorSubject<boolean>;
  private firstAccessedRouteSubject: BehaviorSubject<string>;

  constructor(private authService: AuthService) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.authService.getLoggedInFlag());
    this.firstAccessedRouteSubject = new BehaviorSubject<string>('');
  }

  public getLoggedInStateObservable(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  public updateLoggedInSubject(value: boolean): void {
    this.loggedInSubject.next(value);
  }

  public saveFirstAccessedRoute(url: string): void {
    this.firstAccessedRouteSubject.next(url);
  }

  public getFirstAccessedRoute(): string {
    return this.firstAccessedRouteSubject.value;
  }
}
