import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showcase-item',
  templateUrl: './showcase-item.component.html',
  styleUrls: ['./showcase-item.component.sass'],
})
export class ShowcaseItemComponent {
  @Input() imagePath: string = '';
  @Input() productName: string = '';
  @Input() productPrice: number = 0;
}
