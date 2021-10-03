import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCopyString]'
})
export class CopyStringDirective {

  @Input() value?: string;

  constructor(private el: ElementRef) {
    el.nativeElement.style.fontSize = 16;
    el.nativeElement.style.fontFamilty = "Poppins, sans-serif";
  }


  @HostListener('click') onMouseEnter() {
    // do copy action
  }

}
