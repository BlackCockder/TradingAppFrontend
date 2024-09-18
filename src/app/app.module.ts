import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppComponent} from "./app.component";
import {BrowserModule} from "@angular/platform-browser";
import {AppConfigModule} from "./app-config.module";



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppConfigModule
  ],
  exports: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
