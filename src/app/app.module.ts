import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppConfigModule} from "./config/app-config.module";
import {RouterModule} from "@angular/router";
import {DevModule} from "./dev/modules/Dev.module";
import {FeaturesModule} from "./features/featuresModule/Features.module";
import {QuillModule} from "ngx-quill";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./shared/sharedModule/shared.module";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";


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
        ToastModule
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
