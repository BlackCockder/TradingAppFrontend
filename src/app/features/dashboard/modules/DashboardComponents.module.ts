import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagementComponent} from "../components/management/management.component";
import {SocialComponent} from "../components/social/social.component";
import {AccountComponent} from "../components/account/account.component";
import {SettingsComponent} from "../components/settings/settings.component";
import {ServicesComponent} from "../components/services/services.component";
import {OffersComponent} from "../components/offers/offers.component";
import {ClientPanelComponent} from "../components/client-panel/client-panel.component";
import {CompanyComponent} from "../components/company/company.component";
import {DashboardModule} from "./Dashboard.module";



@NgModule({
  declarations: [
    ManagementComponent,
    SocialComponent,
    AccountComponent,
    SettingsComponent,
    ServicesComponent,
    OffersComponent,
    ClientPanelComponent,
    CompanyComponent,
  ],
  imports: [
    CommonModule,
    DashboardModule,
  ]
})
export class DashboardComponentsModule { }
