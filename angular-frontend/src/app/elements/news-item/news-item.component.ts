import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.sass'],
})
export class NewsItemComponent {
  @Input() imagePath: string = '';
  @Input() newsHeader: string = '';
  @Input() newsContent: string = '';
  @Input() newsDate: string = '';
}
