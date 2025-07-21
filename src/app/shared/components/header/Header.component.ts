import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {PopupsService} from "../popups/services/Popups.service";
import {PopupTypes} from "../popups/enums/PopupTypes";
import {StateManagerService} from "../../globalServices/StateManager.service";
import {Subscription} from "rxjs";
import {AuthService} from "../../../auth/Auth.service";
import {DataFetcherService} from "../../globalServices/DataFetcher.service";
import {BalanceInterface} from "../../globalServices/Balance.interface";

@Component({
  selector: 'app-header',
  templateUrl: './Header.component.html',
  styleUrl: './Header.component.scss',
  standalone: false
})
export class HeaderComponent implements OnDestroy, OnInit {
  @ViewChild('searchInput') searchInputRef!: ElementRef;
  @ViewChild('social') social: any;
  @ViewChild('scrollMenu') scrollMenu!: any;
  @ViewChild('searchField') searchFieldRef!: ElementRef;
  protected items: MenuItem[] = [
    {label: 'Profiles', icon: 'pi pi-book', routerLink: ['/profiles']},
    {label: 'Companies', icon: 'pi pi-video', routerLink: ['/companies']},
    {label: 'News and Votes', icon: 'pi pi-prime', routerLink: ['/news']}
  ];
  protected socialStyleCorrection!: Partial<CSSStyleDeclaration>;
  protected searchPopoverStyleCorrection!: Partial<CSSStyleDeclaration>;
  protected searchedPhrase!: string;
  private searchBarListener!: (() => void) | null;
  protected isLoggedIn!: boolean;
  private isLoggedInSubscription!: Subscription;
  protected balances: MenuItem[] = [
    {label: '$Error', icon: 'pi pi-book'},
  ]

  constructor(private popupsService: PopupsService, private renderer: Renderer2, private stateManagerService: StateManagerService, private authService: AuthService, private dataFetcherService: DataFetcherService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.getLoggedInFlag();
    this.searchBarListener = null;
    this.socialStyleCorrection = {};
    this.searchPopoverStyleCorrection = {};
    this.searchedPhrase = '';
    this.isLoggedInSubscription = this.stateManagerService.getLoggedInStateObservable().subscribe((value: boolean): void => {
      this.isLoggedIn = value;
      if (value) {
        this.dataFetcherService.fetchBalances().subscribe((value: BalanceInterface): void => {
          this.balances = [
            {
              label: `$${value.balance}`, icon: 'pi pi-book', items: [
                {label: `$${value.escrowBalance}`, icon: 'pi pi-book',},
                {label: `$${value.securityBalance}`, icon: 'pi pi-book',}
              ]
            },
          ];
        })
      }
    });

  }

  protected triggerLogin(): void {
    this.popupsService.triggerPopup(PopupTypes.Login);
  }

  protected toggleSocial(event: MouseEvent): void {
    this.social.toggle(event);
  }

  protected onSocialShow(): void {
    this.socialStyleCorrection = {
      top: '2.625rem',
      left: '0px'
    };
  }

  protected onSocialHide(): void {
    this.socialStyleCorrection = {};
  }

  protected onSearchBarClick(event: MouseEvent): void {
    this.scrollMenu.show(event);
    if (this.searchBarListener === null) {
      setTimeout((): void => {
        this.searchBarListener = this.renderer.listen('document', 'click', (event: Event): void => {
          if (!this.searchFieldRef.nativeElement.contains(event.target) && !this.searchInputRef.nativeElement.contains(event.target)) {
            this.hideSearchMenu();
          }
        });
      }, 0);
    }
  }

  protected onSearchPopoverShow(): void {
    this.searchPopoverStyleCorrection = {
      top: '2.625rem',
      left: '0px'
    };
  }

  protected onSearchPopoverHide(): void {
    this.searchPopoverStyleCorrection = {};
  }

  private hideSearchMenu(): void {
    this.scrollMenu.hide();
    if (this.searchBarListener) {
      this.searchBarListener();
      this.searchBarListener = null;
    }
  }

  ngOnDestroy(): void {
    this.isLoggedInSubscription.unsubscribe();
  }

}
