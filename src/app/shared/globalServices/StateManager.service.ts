import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {AuthService} from "../../auth/Auth.service";
import {MessageDisplayService} from "./MessageDisplay.service";

@Injectable({
  providedIn: 'root'
})
export class StateManagerService {
  private loggedInSubject: BehaviorSubject<boolean>;
  private firstAccessedRouteSubject: BehaviorSubject<string>;

  constructor(private authService: AuthService, private messageDisplayService: MessageDisplayService) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.authService.getLoggedInFlag());
    this.firstAccessedRouteSubject = new BehaviorSubject<string>('');
    window.addEventListener('storage', (event: StorageEvent): void => {
      if(event.key === 'isLoggedInFlag') {
        if(event.newValue === 'true') {
          this.authService.refreshSession();
          this.updateLoggedInSubject(event.newValue === 'true');
          this.messageDisplayService.triggerToastMessage('success', 'Logged in', 'Logged in from different window!', 5000);
        }
      }
    })
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
