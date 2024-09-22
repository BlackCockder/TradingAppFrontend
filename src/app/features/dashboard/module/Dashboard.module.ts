import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "../Dashboard.component";
import {RouterLink, RouterOutlet} from "@angular/router";



@NgModule({
  declarations: [
    DashboardComponent
  ],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink
    ]
})
export class DashboardModule { }
