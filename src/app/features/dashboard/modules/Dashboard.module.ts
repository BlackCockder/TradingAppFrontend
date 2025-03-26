import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {DashboardComponent} from "../Dashboard.component";
import {RouterLink, RouterOutlet} from "@angular/router";
import {DashboardHeaderComponent} from "../components/dashboardHeader/DashboardHeader.component";
import {DashboardComponentsModule} from "./DashboardComponents.module";


@NgModule({
    declarations: [
        DashboardComponent,
        DashboardHeaderComponent
    ],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        DashboardComponentsModule,
        NgOptimizedImage
    ],

    exports: [
        DashboardHeaderComponent
    ]
})
export class DashboardModule {
}
