import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppConfigModule} from "./app-config.module";
import {RouterOutlet} from "@angular/router";
import {DevModule} from "./dev/module/Dev.module";
import {FeaturesModule} from "./features/featuresModule/Features.module";


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
    FeaturesModule
  ],
  exports: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
