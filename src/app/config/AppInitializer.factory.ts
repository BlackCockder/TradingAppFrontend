import {catchError, firstValueFrom, of, tap} from "rxjs";
import {AuthService} from "../auth/Auth.service";
import {RefreshResponse} from "../auth/interfaces/RefreshResponse.interface";
import {HttpErrorResponse} from "@angular/common/http";
import {inject} from "@angular/core";
import {MessageDisplayService} from "../shared/globalServices/MessageDisplay.service";

export function initializeAppFactory(authService: AuthService): () => Promise<any> {
  let messageDisplayService: MessageDisplayService = inject(MessageDisplayService);
  return (): Promise<any> => {
    return firstValueFrom(authService.refreshSession().pipe(

    tap((response: RefreshResponse): void => {
      authService.setUserID(response.id);
      authService.setAuthToken(response.authenticationToken);
      authService.setUsernameToCache(response.username);
      authService.setLoggedInFlag(true);
      console.log('yes')
      setTimeout((): void => {
        messageDisplayService.triggerToastMessage("success", "Logged in", "Logged in due to 'Remember me' activated!", 5000);
      }, 500);
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
