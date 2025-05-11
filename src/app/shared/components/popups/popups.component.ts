import { Component } from '@angular/core';
import {PopupsService} from "./services/popups.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrl: './popups.component.scss',
  standalone: false
})
export class PopupsComponent {
  username: string = '';
  password: string = '';
  popupIDSubscription!: Subscription;
  popupIDBoolArray!: boolean[];

  constructor(private popupsService: PopupsService) {
  }

  ngOnInit(): void {
    this.popupIDBoolArray = [
      false,
    ];
    this.popupIDSubscription = this.popupsService.getPopupIDAsObservable().subscribe((id: number | null):void => {
      if(id != null) {
        this.popupIDBoolArray[id] = true;
      }
    });
  }

  protected closeAnyPopup(): void {
    this.popupIDBoolArray.forEach((): boolean => false);
  }

  ngOnDestroy(): void {
    this.popupIDSubscription.unsubscribe();
  }
}
