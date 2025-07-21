import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from "./App.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppConfigModule} from "./config/AppConfig.module";
import {RouterModule} from "@angular/router";
import {DevModule} from "./dev/modules/Dev.module";
import {FeaturesModule} from "./features/featuresModule/Features.module";
import {QuillModule} from "ngx-quill";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./shared/sharedModule/Shared.module";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {PopupsModule} from "./shared/components/popups/modules/Popups.module";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        AppConfigModule,
        RouterModule,
        SharedModule,
        DevModule,
        FeaturesModule,
        FormsModule,
        QuillModule.forRoot(),
        ButtonModule,
        ToastModule,
        PopupsModule
    ],
  providers: [
    MessageService
  ],
  exports: [],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
