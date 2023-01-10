import { Component } from '@angular/core';
interface Product {
  imagePath: string;
  productName: string;
  productPrice: number;
}

interface News {
  imagePath: string;
  newsHeader: string;
  newsContent: string;
  newsDate: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass'],
})
export class MainComponent {
  items = ['Tom', 'Bob', 'Sam', 'Bill'];

  productsShowcase: Product[] = [
    {
      imagePath: '../../assets/showcase/phone1.jpg',
      productName: 'Телефон телефон телефон',
      productPrice: 1000,
    },
    {
      imagePath: '../../assets/showcase/phone1.jpg',
      productName: 'Телефон телефон телефон',
      productPrice: 2000,
    },
    {
      imagePath: '../../assets/showcase/phone1.jpg',
      productName: 'Телефон телефон телефон',
      productPrice: 3000,
    },
    {
      imagePath: '../../assets/showcase/phone1.jpg',
      productName: 'Телефон телефон телефон',
      productPrice: 4000,
    },
  ];

  newsShowcase: News[] = [
    {
      imagePath: '../../assets/news/news1.jpg',
      newsHeader: 'Новость',
      newsContent: 'Содержание новости',
      newsDate: '01.01.2023',
    },
    {
      imagePath: '../../assets/news/news1.jpg',
      newsHeader: 'Новость',
      newsContent: 'Содержание новости',
      newsDate: '01.01.2023',
    },
    {
      imagePath: '../../assets/news/news1.jpg',
      newsHeader: 'Новость',
      newsContent: 'Содержание новости',
      newsDate: '01.01.2023',
    },
    {
      imagePath: '../../assets/news/news1.jpg',
      newsHeader: 'Новость',
      newsContent: 'Содержание новости',
      newsDate: '01.01.2023',
    },
  ];
}
