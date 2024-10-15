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
import {DashboardWindowTemplateComponent} from "../templates/dashboardWindow/DashboardWindow.template.component";
import {QuillEditorComponent} from "ngx-quill";
import {FormsModule} from "@angular/forms";
import {CreatorComponent} from "../components/creator/creator.component";



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
    DashboardWindowTemplateComponent,
    CreatorComponent
  ],
  imports: [
    CommonModule,
    QuillEditorComponent,
    FormsModule,
  ],
  exports: [
    DashboardWindowTemplateComponent
  ]
})
export class DashboardComponentsModule { }
