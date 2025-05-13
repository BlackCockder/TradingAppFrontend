import {Component, Input} from '@angular/core';
import {PopupsService} from "../../services/Popups.service";

@Component({
  selector: 'app-login-popup',
  templateUrl: './LoginPopup.component.html',
  styleUrl: './LoginPopup.component.scss',
  standalone: false
})
export class LoginPopupComponent {
  protected username!: string;
  protected password!: string;
  @Input() state!: boolean;

  constructor(private popupsService: PopupsService) {

  }

  ngOnInit(): void {
    this.username = '';
    this.password = ''
  }

  protected emitCloseSignal(): void {
    this.popupsService.clearPopup();
  }
}
