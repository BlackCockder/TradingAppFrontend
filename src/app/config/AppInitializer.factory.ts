import {catchError, firstValueFrom, of, tap} from "rxjs";
import {AuthService} from "../auth/Auth.service";
import {RefreshResponse} from "../auth/interfaces/RefreshResponse.interface";
import {HttpErrorResponse} from "@angular/common/http";

export function initializeAppFactory(authService: AuthService): () => Promise<any> {

  return (): Promise<any> => {
    return firstValueFrom(authService.refreshSession(true).pipe(
      tap((response: RefreshResponse): void => {
        authService.setUserID(response.id);
        authService.setAuthToken(response.authenticationToken);
        authService.setUsername(response.username);
        authService.setLoggedInFlag(true);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        authService.clearUsernameFromCache();
        authService.logoutUser();
        return of(null);
      })
    ));
  };
}
