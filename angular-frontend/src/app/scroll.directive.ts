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
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', '40px');
  }

  @HostListener('window:scroll')
  onScroll() {
    if (window.scrollY >= 0 && window.scrollY <= 40) {
      console.log(window.scrollY);
      this.renderer.setStyle(
        this.elementRef.nativeElement,
        'top',
        String(40 - window.scrollY) + 'px'
      );
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'top', '0px');
    }
  }
}
