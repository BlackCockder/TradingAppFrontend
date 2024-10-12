import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppConfigModule} from "./app-config.module";
import {RouterOutlet} from "@angular/router";
import {DevModule} from "./dev/modules/Dev.module";
import {FeaturesModule} from "./features/featuresModule/Features.module";
import {QuillModule} from "ngx-quill";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppConfigModule,
    RouterOutlet,
    DevModule,
    FeaturesModule,
    FormsModule,
    QuillModule.forRoot()
  ],
  exports: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
