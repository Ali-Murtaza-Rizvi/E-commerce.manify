import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
interface categories{
  image:string;
  title:string;
}
@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  Categories:categories[] = [
    {
      image:'assests/first.jpg',
      title:'Shoes Collection'
    },
    {
      image:'assests/fourth.jpg',
      title:'Watches Collection'
    },
    {
      image:'assests/seventh.jpg',
      title:'Suits Collection'
    },
    {
      image:'assests/sixth.jpg',
      title:'Shirts Collection'
    },
    {
      image:'assests/shorts.jpg',
      title:'Active Wear Collection'
    },
    {
      image:'assests/fifth.jpg',
      title:'Pants Collection'
    }

  ]
}
