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
      image:'assests/first.jpg',
      title:'Watches Collection'
    },
    {
      image:'assests/first.jpg',
      title:'Suits Collection'
    },
    {
      image:'assests/first.jpg',
      title:'shirts Collection'
    },
    {
      image:'assests/first.jpg',
      title:'Shoes Collection'
    },
    {
      image:'assests/first.jpg',
      title:'Pants Collection'
    }

  ]
}
