import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthService} from "../Auth.service";
import {catchError} from "rxjs";

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  let authService: AuthService = inject(AuthService);

  if (authService.checkForAuthorisationRequest(req)) {
    if (authService.getAuthToken()) {
      req = authService.addTokenToReq(req, authService.getAuthToken());
    }
  }

  return next(req).pipe(catchError(error => {
    if (error instanceof HttpErrorResponse && (error.status == 403 || error.status == 401)) {
      return authService.handleAuthErrors(req, next);
    } else {
      console.error("Uncaught error: ");
      console.error(error);
      return next(req);
    }
  }));
}
