import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopupsComponent} from "../Popups.component";
import {LoginPopupComponent} from "../components/loginPopup/LoginPopup.component";
import {Dialog} from "primeng/dialog";
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {InputText} from "primeng/inputtext";



@NgModule({
  declarations: [
    PopupsComponent,
    LoginPopupComponent
  ],
  imports: [
    CommonModule,
    Dialog,
    Button,
    FormsModule,
    InputText
  ],
  exports: [
    PopupsComponent
  ]
})
export class PopupsModule { }
