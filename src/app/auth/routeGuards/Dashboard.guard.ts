import {ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../Auth.service";
import {inject} from "@angular/core";
import {StateManagerService} from "../../shared/globalServices/StateManager.service";
import {Observable, of} from "rxjs";
import {LoginFormPayload} from "../interfaces/LoginFormPayload.interface";

export const dashboardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> => {
  const authService: AuthService = inject(AuthService);
  const stateManagerService: StateManagerService = inject(StateManagerService);
  const router: Router = inject(Router);
  if(authService.getRememberMeCredentials()) {
    return authService.loginUser(<LoginFormPayload>authService.getRememberMeCredentials())
  }
  else {
    stateManagerService.saveFirstAccessedRoute(state.url);
    router.navigate(['']);
    //Trigger popup
    return of(false);
  }
};
