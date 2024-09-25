import {SafeHtml} from "@angular/platform-browser";

export interface DisplayBalanceInterface {
  color: string,
  balance: number,
  svg: string | SafeHtml
}
