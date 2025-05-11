import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";
import {PopupsService} from "../popups/services/popups.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: false
})
export class HeaderComponent {
  protected items: MenuItem[] = [
    {label: 'Profiles', icon: 'pi pi-book', routerLink: ['/profiles']},
    {label: 'Companies', icon: 'pi pi-video', routerLink: ['/companies']}
  ];

  constructor(private popupsService: PopupsService) {
  }
  ngOnInit(): void {
  }

  protected triggerLogin(): void {
    this.popupsService.triggerPopup(0);
  }
}
