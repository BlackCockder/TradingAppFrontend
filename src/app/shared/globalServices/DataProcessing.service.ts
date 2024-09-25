import { Injectable } from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class DataProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public sanitizeSVG(svgContent: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgContent);
  }
}
