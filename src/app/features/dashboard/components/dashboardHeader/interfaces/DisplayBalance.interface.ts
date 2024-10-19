import {SafeHtml} from "@angular/platform-browser";

export interface DisplayBalanceInterface {
  color: number,
  balance: number | string,
  svg: string | SafeHtml
}
