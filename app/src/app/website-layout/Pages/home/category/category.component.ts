import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Category {
  image: string;
  title: string;
}

@Component({
  selector: 'app-category',
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  Categories: Category[] = [
    { image: 'assests/first.jpg', title: 'Shoes Collection' },
    { image: 'assests/fourth.jpg', title: 'Watches Collection' },
    { image: 'assests/seventh.jpg', title: 'Suits Collection' },
    { image: 'assests/sixth.jpg', title: 'Shirts Collection' },
    { image: 'assests/shorts.jpg', title: 'Active Wear Collection' },
    { image: 'assests/fifth.jpg', title: 'Pants Collection' }
  ];

  paginatedCategories: Category[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  ngOnInit() {
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCategories = this.Categories.slice(start, end);
  }

  nextPage() {
    if (this.currentPage * this.itemsPerPage < this.Categories.length) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
