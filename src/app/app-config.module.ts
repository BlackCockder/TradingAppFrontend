import { NgModule } from '@angular/core';
import {AppConfig} from "./app.config";

@NgModule({
  providers: [
    AppConfig.providers
  ]
})
export class AppConfigModule { }
