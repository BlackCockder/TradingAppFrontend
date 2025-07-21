import {NgModule} from '@angular/core';
import {AppConfig} from "./App.config";

@NgModule({
  providers: [
    AppConfig.providers
  ]
})
export class AppConfigModule {
}
