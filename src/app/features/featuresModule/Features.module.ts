import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardModule} from "../dashboard/modules/Dashboard.module";
import {RegisterComponent} from "../register/Register.component";
import {AboutUsComponent} from "../aboutUs/AboutUs.component";
import {BlogComponent} from "../blog/Blog.component";
import {CompaniesComponent} from "../companies/Companies.component";
import {ContactUsComponent} from "../contactUs/ContactUs.component";
import {GuideComponent} from "../guide/Guide.component";
import {HelpCenterComponent} from "../helpCenter/HelpCenter.component";
import {MarketComponent} from "../market/Market.component";
import {ProfilesComponent} from "../profiles/Profiles.component";


@NgModule({
  declarations: [
    RegisterComponent,
    AboutUsComponent,
    BlogComponent,
    CompaniesComponent,
    ContactUsComponent,
    GuideComponent,
    HelpCenterComponent,
    MarketComponent,
    ProfilesComponent
  ],
  imports: [
    CommonModule,
    DashboardModule,
  ]
})
export class FeaturesModule {
}
