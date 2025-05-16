import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HeaderComponent} from "../components/header/Header.component";
import {RouterLink} from "@angular/router";
import {Divider} from "primeng/divider";
import {Button, ButtonDirective, ButtonIcon, ButtonLabel} from "primeng/button";
import {Menu} from "primeng/menu";
import {Select} from "primeng/select";
import {PrimeTemplate} from "primeng/api";
import {AutoComplete} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {Ripple} from "primeng/ripple";
import {IconField} from "primeng/iconfield";
import {InputIcon} from "primeng/inputicon";
import {InputText} from "primeng/inputtext";
import {Dialog} from "primeng/dialog";
import {PopupsModule} from "../components/popups/modules/Popups.module";
import {StyleClass} from "primeng/styleclass";
import {Popover} from "primeng/popover";
import {InputGroup} from "primeng/inputgroup";
import {InputGroupAddon} from "primeng/inputgroupaddon";
import {Badge} from "primeng/badge";
import {Avatar} from "primeng/avatar";



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  exports: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    Divider,
    Button,
    Menu,
    Select,
    PrimeTemplate,
    AutoComplete,
    ButtonDirective,
    ButtonIcon,
    FormsModule,
    ButtonLabel,
    Ripple,
    IconField,
    InputIcon,
    InputText,
    Dialog,
    PopupsModule,
    StyleClass,
    Popover,
    InputGroup,
    InputGroupAddon,
    Badge,
    Avatar
  ]
})
export class SharedModule { }
