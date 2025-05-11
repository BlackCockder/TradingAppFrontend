import {ErrorHandler, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {MessageDisplayService} from "../globalServices/MessageDisplay.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private static errorSubject: BehaviorSubject<Error | null> = new BehaviorSubject<Error | null>(null);
  private errorTimeoutId: number | null = null;

  constructor(private messageDisplayService: MessageDisplayService) {
  }

  handleError(error: any): void {
    const formattedError: Error = error instanceof Error ? error : new Error(String(error));
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
    }
    GlobalErrorHandlerService.errorSubject.next(formattedError);
    console.error(error);
    this.messageDisplayService.triggerToastMessage('error', 'An error has occured!', formattedError.message, 3500);

    this.errorTimeoutId = setTimeout((): void => {
      GlobalErrorHandlerService.errorSubject.next(null);
      this.errorTimeoutId = null;
    }, 5000);
  }

  public getErrorSubjectObservable(): Observable<Error | null> {
    return GlobalErrorHandlerService.errorSubject.asObservable();
  }


}
