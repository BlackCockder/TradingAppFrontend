import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ManagementComponent} from "../management/management.component";
import {SocialComponent} from "../social/social.component";
import {AccountComponent} from "../account/account.component";
import {SettingsComponent} from "../settings/settings.component";
import {ServicesComponent} from "../services/services.component";
import {OffersComponent} from "../offers/offers.component";
import {ClientPanelComponent} from "../client-panel/client-panel.component";
import {CompanyComponent} from "../company/company.component";



@NgModule({
  declarations: [
    ManagementComponent,
    SocialComponent,
    AccountComponent,
    SettingsComponent,
    ServicesComponent,
    OffersComponent,
    ClientPanelComponent,
    CompanyComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardComponentsModule { }
