import {Component} from '@angular/core';
import {SidebarButton} from "./interfaces/SidebarButton.interface";
import {SidebarButtonNames, SidebarButtonRedirects, SidebarButtonSVGs} from "./enums/SidebarButton.enum";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-dashboard',
  templateUrl: './Dashboard.component.html',
  styleUrl: './Dashboard.component.scss'
})
export class DashboardComponent {
  sidebarButtons!: SidebarButton[];

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.sidebarButtons = [
      {
        buttonName: SidebarButtonNames.MANAGEMENT,
        svg: this.sanitizeSVG(SidebarButtonSVGs.MANAGEMENT),
        redirectsTo: SidebarButtonRedirects.MANAGEMENT,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.OFFERS,
        svg: this.sanitizeSVG(SidebarButtonSVGs.OFFERS),
        redirectsTo: SidebarButtonRedirects.OFFERS,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.SERVICES,
        svg: this.sanitizeSVG(SidebarButtonSVGs.SERVICES),
        redirectsTo: SidebarButtonRedirects.SERVICES,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.CLIENT_PANEL,
        svg: this.sanitizeSVG(SidebarButtonSVGs.CLIENT_PANEL),
        redirectsTo: SidebarButtonRedirects.CLIENT_PANEL,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.COMPANY,
        svg: this.sanitizeSVG(SidebarButtonSVGs.COMPANY),
        redirectsTo: SidebarButtonRedirects.COMPANY,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.SOCIAL,
        svg: this.sanitizeSVG(SidebarButtonSVGs.SOCIAL),
        redirectsTo: SidebarButtonRedirects.SOCIAL,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.ACCOUNT,
        svg: this.sanitizeSVG(SidebarButtonSVGs.ACCOUNT),
        redirectsTo: SidebarButtonRedirects.ACCOUNT,
        highlighted: false
      },
      {
        buttonName: SidebarButtonNames.SETTINGS,
        svg: this.sanitizeSVG(SidebarButtonSVGs.SETTINGS),
        redirectsTo: SidebarButtonRedirects.SETTINGS,
        highlighted: false
      },
    ]
  }


  sanitizeSVG(svgContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }


  buttonClicked(button: number): void {
    this.sidebarButtons.forEach((button) => {button.highlighted = false});
    this.sidebarButtons[button].highlighted = true;
  }
}
