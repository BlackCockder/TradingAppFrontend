import {Component} from '@angular/core';
import {SidebarButton} from "./interfaces/SidebarButton.interface";
import {SidebarButtonNames, SidebarButtonRedirects, SidebarButtonSVGs} from "./enums/SidebarButton.enum";
import {DataProcessingService} from "../../shared/globalServices/DataProcessing.service";
import {NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/Auth.service";
import {SERVER_IP} from "../../../main";

@Component({
    selector: 'app-dashboard',
    templateUrl: './Dashboard.component.html',
    styleUrl: './Dashboard.component.scss',
    standalone: false
})
export class DashboardComponent {
  sidebarButtons!: SidebarButton[];
  private routeSubscription!: Subscription;

  constructor(private dataProcessingService: DataProcessingService,
              private router: Router,
              private http: HttpClient,
              private authService: AuthService) {
  }

  ngOnInit(): void {
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
        buttonName: SidebarButtonNames.CREATOR,
        svg: this.dataProcessingService.sanitizeSVG(SidebarButtonSVGs.CREATOR),
        redirectsTo: SidebarButtonRedirects.CREATOR,
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
    ];

    this.routeSubscription = this.router.events.subscribe((event): void => {
      if (event instanceof NavigationEnd) {
        if (event.url.replace('/dashboard', '')) {
          this.sidebarButtons.forEach((button: SidebarButton): void => {
            button.highlighted = false;
          });
          this.sidebarButtons[this.sidebarButtons.findIndex(
            (button: SidebarButton): boolean => button.redirectsTo === event.url.replace('/dashboard', ''))]
            .highlighted = true;
        }
        else {
          this.sidebarButtons.forEach((button: SidebarButton): void => {
            button.highlighted = false;
          });
        }
      }
    })


    if (this.router.url.replace('/dashboard', '')) {
      this.sidebarButtons[this.sidebarButtons.findIndex(
        (button: SidebarButton): boolean => button.redirectsTo === this.router.url.replace('/dashboard', ''))]
        .highlighted = true;
    }
  }


  protected buttonClicked(button: number): void {
    this.sidebarButtons.forEach((button: SidebarButton): void => {
      button.highlighted = false
    });
    this.sidebarButtons[button].highlighted = true;
  }

  protected logOutUser(): void {
    this.http.post(`${SERVER_IP}api/securedAuth/account/logout`, {}, {
      headers: this.authService.authorizationNeeded(), responseType: 'text'
    }).subscribe(
      {
        next: (response: string): void => {
          this.authService.logoutUser();
          console.log(response);
          this.router.navigate(['']);
        },
        error: err => {
          console.log(err);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
