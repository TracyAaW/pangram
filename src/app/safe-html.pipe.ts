import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

import { PipeTransform, Pipe } from "@angular/core";

@Pipe({ name: 'safeHtml', standalone: true})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value: any) {
    if (!value) {
      return null;
    }
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}