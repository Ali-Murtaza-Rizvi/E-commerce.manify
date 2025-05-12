
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

interface Category {
  image: string;
  category:string;
  title: string;
}

@Component({
  selector: 'app-category',
  imports: [CommonModule,RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit {
  Categories: Category[] = [
    { image: 'assests/first.jpg', category: 'Shoes', title: 'Shoes Collection' },
    { image: 'assests/fourth.jpg', category: 'Watches', title: 'Watches Collection' },
    { image: 'assests/seventh.jpg', category: 'Suits', title: 'Suits Collection' },
    { image: 'assests/sixth.jpg', category: 'Shirts', title: 'Shirts Collection' },
    { image: 'assests/shorts.jpg', category: 'Trousers', title: 'Trousers Collection' },
    { image: 'assests/fifth.jpg', category: 'Pants', title: 'Pants Collection' }
  ];
  constructor(private router: Router) { }
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
  selectCategory(category: string) {
    console.log(category);
    this.router.navigate(['/shop/product'], { queryParams: { category } });
  }
}
