import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DevComponent} from "../Dev.component";
import {Button} from "primeng/button";

@NgModule({
  declarations: [
    DevComponent
  ],
    imports: [
        CommonModule,
        Button
    ]
})
export class DevModule {
}
