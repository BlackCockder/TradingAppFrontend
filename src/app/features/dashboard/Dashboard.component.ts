import {Component} from '@angular/core';
import {SidebarButton} from "./interfaces/SidebarButton.interface";
import {SidebarButtonNames, SidebarButtonRedirects, SidebarButtonSVGs} from "./enums/SidebarButton.enum";
import {DataProcessingService} from "../../shared/globalServices/DataProcessing.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.scss'
})
export class DashboardComponent {
  sidebarButtons!: SidebarButton[];

  constructor(private dataProcessingService: DataProcessingService) {
  }

  ngOnInit() {
    this.sidebarButtons = [
      {
        buttonName: SidebarButtonNames.MANAGEMENT,
        svg: this.dataProcessingService.sanitizeSVG(SidebarButtonSVGs.MANAGEMENT),
        redirectsTo: SidebarButtonRedirects.MANAGEMENT,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.OFFERS,
        svg: this.dataProcessingService.sanitizeSVG(SidebarButtonSVGs.OFFERS),
        redirectsTo: SidebarButtonRedirects.OFFERS,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.SERVICES,
        svg: this.dataProcessingService.sanitizeSVG(SidebarButtonSVGs.SERVICES),
        redirectsTo: SidebarButtonRedirects.SERVICES,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.CLIENT_PANEL,
        svg: this.dataProcessingService.sanitizeSVG(SidebarButtonSVGs.CLIENT_PANEL),
        redirectsTo: SidebarButtonRedirects.CLIENT_PANEL,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.COMPANY,
        svg: this.dataProcessingService.sanitizeSVG(SidebarButtonSVGs.COMPANY),
        redirectsTo: SidebarButtonRedirects.COMPANY,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.SOCIAL,
        svg: this.dataProcessingService.sanitizeSVG(SidebarButtonSVGs.SOCIAL),
        redirectsTo: SidebarButtonRedirects.SOCIAL,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.ACCOUNT,
        svg: this.dataProcessingService.sanitizeSVG(SidebarButtonSVGs.ACCOUNT),
        redirectsTo: SidebarButtonRedirects.ACCOUNT,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.SETTINGS,
        svg: this.dataProcessingService.sanitizeSVG(SidebarButtonSVGs.SETTINGS),
        redirectsTo: SidebarButtonRedirects.SETTINGS,
        highlighted: false
      },
    ]
  }


  buttonClicked(button: number): void {
    this.sidebarButtons.forEach((button: SidebarButton): void => {
      button.highlighted = false
    });
    this.sidebarButtons[button].highlighted = true;
  }
}
