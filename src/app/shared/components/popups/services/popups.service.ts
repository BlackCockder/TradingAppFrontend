import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PopupsService {
  private popupID$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  private popupTimeoutId: number | null = null;
  constructor() { }

  public triggerPopup(id: number): void {
    if (this.popupTimeoutId) {
      clearTimeout(this.popupTimeoutId);
    }
    this.popupID$.next(id);
    this.popupTimeoutId = setTimeout((): void => this.popupID$.next(null), 5000)
  }

  public getPopupIDAsObservable(): Observable<number | null> {
    return this.popupID$.asObservable();
  }
}
