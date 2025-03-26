import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardModule} from "../dashboard/modules/Dashboard.module";
import {RegisterComponent} from "../register/register.component";


@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    DashboardModule,
  ]
})
export class FeaturesModule {
}
