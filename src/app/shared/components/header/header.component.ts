import { Component } from '@angular/core';
import {MenuItem} from "primeng/api";

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
  protected visible!: boolean;

  constructor() {
    this.visible = false;
  }

  closeDialog() {
    this.visible = !this.visible;
  }
}
