import {Component, ViewChild} from '@angular/core';
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
  @ViewChild('social') social: any;
  @ViewChild('scrollMenu') scrollMenu: any;
  protected items: MenuItem[] = [
    {label: 'Profiles', icon: 'pi pi-book', routerLink: ['/profiles']},
    {label: 'Companies', icon: 'pi pi-video', routerLink: ['/companies']}
  ];
  protected socialStyleCorrection!: Partial<CSSStyleDeclaration>;
  protected searchPopoverStyleCorrection!: Partial<CSSStyleDeclaration>;

  constructor(private popupsService: PopupsService) {
  }
  ngOnInit(): void {
    this.socialStyleCorrection = {};
    this.searchPopoverStyleCorrection = {}
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
  protected showSearchPopover(event: FocusEvent): void {
    this.scrollMenu.toggle(event);
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

}
