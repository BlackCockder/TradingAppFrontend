import {ErrorHandler, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  private static errorSubject: BehaviorSubject<Error | null> = new BehaviorSubject<Error | null>(null);

  constructor() {
  }

  handleError(error: Error): void {
    GlobalErrorHandlerService.errorSubject.next(error);
    console.log(error);
  }

  public getErrorSubjectObservable(): Observable<Error | null> {
    return GlobalErrorHandlerService.errorSubject.asObservable();
  }


}
