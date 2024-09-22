import {SafeHtml} from "@angular/platform-browser";

export interface SidebarButton {
  buttonName: string,
  svg: string | SafeHtml,
  redirectsTo: string,
  highlighted: boolean
}
