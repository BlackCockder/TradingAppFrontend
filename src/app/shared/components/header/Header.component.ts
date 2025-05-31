import {Component, ElementRef, Renderer2, ViewChild} from '@angular/core';
import {MenuItem} from "primeng/api";
import {PopupsService} from "../popups/services/Popups.service";
import {PopupTypes} from "../popups/enums/PopupTypes";

@Component({
    selector: 'app-header',
    templateUrl: './Header.component.html',
    styleUrl: './Header.component.scss',
    standalone: false
})
export class HeaderComponent {
  @ViewChild('searchInput') searchInputRef!: ElementRef;
  @ViewChild('social') social: any;
  @ViewChild('scrollMenu') scrollMenu!: any;
  @ViewChild('searchField') searchFieldRef!: ElementRef;
  protected items: MenuItem[] = [
    {label: 'Profiles', icon: 'pi pi-book', routerLink: ['/profiles']},
    {label: 'Companies', icon: 'pi pi-video', routerLink: ['/companies']},
    {label: 'News and Votes', icon: 'pi pi-book', routerLink: ['/news']}
  ];
  protected socialStyleCorrection!: Partial<CSSStyleDeclaration>;
  protected searchPopoverStyleCorrection!: Partial<CSSStyleDeclaration>;
  protected searchedPhrase!: string;
  private searchBarListener: (() => void) | null = null;

  constructor(private popupsService: PopupsService, private renderer: Renderer2) {
  }
  ngOnInit(): void {
    this.socialStyleCorrection = {};
    this.searchPopoverStyleCorrection = {}
    this.searchedPhrase = '';
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
    }
  }
  protected onSocialHide(): void {
    this.socialStyleCorrection = {};
  }
  protected onSearchBarClick(event: MouseEvent): void {
    this.scrollMenu.show(event);
    setTimeout((): void => {
      this.searchBarListener = this.renderer.listen('document', 'click', (event: Event): void => {
        if (!this.searchFieldRef.nativeElement.contains(event.target) && !this.searchInputRef.nativeElement.contains(event.target)) {
          console.log("tirggered")
          this.hideSearchMenu();
        }
      });
    }, 0);
  }

  protected onSearchPopoverShow(): void {
    this.searchPopoverStyleCorrection = {
      top: '2.625rem',
      left: '0px'
    }
  }

  protected onSearchPopoverHide(): void {
    this.searchPopoverStyleCorrection = {}
  }

  private hideSearchMenu(): void {
    this.scrollMenu.hide();
    if (this.searchBarListener) {
      this.searchBarListener();
      this.searchBarListener = null;
    }
  }

  ngAfterViewInit(): void {
    console.log(this.scrollMenu);
  }

}
