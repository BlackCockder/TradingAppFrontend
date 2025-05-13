import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {PopupTypes} from "../enums/PopupTypes";

@Injectable({
  providedIn: 'root'
})
export class PopupsService {
  private popupID$: BehaviorSubject<PopupTypes | null> = new BehaviorSubject<PopupTypes | null>(null);
  constructor() { }

  public triggerPopup(popup: PopupTypes): void {
    this.popupID$.next(popup);

  }

  public clearPopup(): void {
    this.popupID$.next(null);
  }

  public getPopupIDAsObservable(): Observable<PopupTypes | null> {
    return this.popupID$.asObservable();
  }
}
