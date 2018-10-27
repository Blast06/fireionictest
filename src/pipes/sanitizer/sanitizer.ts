import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '../../../node_modules/@angular/platform-browser';




@Pipe({
  name: 'sanitizer',
})
export class SanitizerPipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}
 
  transform(html) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(html);
  }
}
