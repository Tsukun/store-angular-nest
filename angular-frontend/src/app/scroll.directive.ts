import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appScroll]',
})
export class ScrollDirective {
  private height = 60;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', '0px');
  }

  // @HostBinding('style.Width') get getTop() {
  //   return this.height;
  // }
  // @HostListener('window:scroll')
  // onScroll() {
  //   if (window.scrollY >= 60) {
  //     console.log(window.scrollY);
  //     this.renderer.setStyle(
  //       this.elementRef.nativeElement,
  //       'top',
  //       String(window.scrollY) + 'px'
  //     );
  //   } else if (window.scrollY == 0) {
  //     this.renderer.setStyle(this.elementRef.nativeElement, 'top', '0px');
  //   }
  // }
}
