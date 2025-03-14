import {ErrorHandler, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private static errorSubject: BehaviorSubject<Error | null> = new BehaviorSubject<Error | null>(null);
  private errorTimeoutId: number | null = null;

  constructor() {
  }

  handleError(error: any): void {
    const formattedError: Error = error instanceof Error ? error : new Error(String(error));
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
    }
    GlobalErrorHandlerService.errorSubject.next(formattedError);
    console.log(error);
    this.errorTimeoutId = setTimeout((): void => {
      GlobalErrorHandlerService.errorSubject.next(null);
      this.errorTimeoutId = null;
    }, 5000);
  }

  public getErrorSubjectObservable(): Observable<Error | null> {
    return GlobalErrorHandlerService.errorSubject.asObservable();
  }


}
