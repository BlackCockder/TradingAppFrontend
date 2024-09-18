import { ErrorHandler, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {
  public errorSubject: BehaviorSubject<Error | null> = new BehaviorSubject<Error | null>(null);
  public errorSubject$: Observable<Error | null> = this.errorSubject.asObservable();

  constructor() { }

  handleError(error: Error): void {
    this.updateSubject(error);
    console.log(error);
    console.log(this.errorSubject.getValue()?.message);
  }

  updateSubject(error: Error): void {
    this.errorSubject.next(error);
    console.log("Submethod trggered");
  }
}
