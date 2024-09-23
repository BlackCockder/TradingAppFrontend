import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "../Dashboard.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {DashboardWindowTemplateComponent} from "../templates/dashboardWindow/DashboardWindow.template.component";


@NgModule({
  declarations: [
    DashboardComponent,
    DashboardWindowTemplateComponent
  ],
  exports: [
    DashboardWindowTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink
  ]
})
export class DashboardModule { }
