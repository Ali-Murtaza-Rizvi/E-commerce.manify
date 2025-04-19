import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss'
})
export class ReviewComponent {
 @Input() reviews:string = " ";
  constructor() { }
}
