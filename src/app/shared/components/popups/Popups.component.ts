import { Component } from '@angular/core';
import {PopupsService} from "./services/Popups.service";
import {Subscription} from "rxjs";
import {PopupTypes} from "./enums/PopupTypes";
@Component({
  selector: 'app-popups',
  templateUrl: './Popups.component.html',
  styleUrl: './Popups.component.scss',
  standalone: false
})
export class PopupsComponent {
  protected popupTypes = PopupTypes;
  protected popupID: PopupTypes | null = null;
  private popupIDSubscription!: Subscription;

  constructor(private popupsService: PopupsService) {
  }

  ngOnInit(): void {
    this.popupIDSubscription = this.popupsService.getPopupIDAsObservable().subscribe((id: PopupTypes | null): void => {
      this.popupID = id;
    });
  }

  ngOnDestroy(): void {
    this.popupIDSubscription.unsubscribe();
  }
}
