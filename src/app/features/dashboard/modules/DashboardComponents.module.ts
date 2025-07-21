import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AutomationAPIComponent} from "../components/automationAPI/AutomationAPI.component";
import {CompanyComponent} from "../components/company/Company.component";
import {CreatorComponent} from "../components/creator/Creator.component";
import {DisputesComponent} from "../components/disputes/Disputes.component";
import {MyBusinessComponent} from "../components/myBusiness/MyBusiness.component";
import {MyOrdersComponent} from "../components/myOrders/MyOrders.component";
import {ProfileSettingsComponent} from "../components/profileSettings/ProfileSettings.component";



@NgModule({
  declarations: [
    AutomationAPIComponent,
    CompanyComponent,
    CreatorComponent,
    DisputesComponent,
    MyBusinessComponent,
    MyOrdersComponent,
    ProfileSettingsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardComponentsModule { }
