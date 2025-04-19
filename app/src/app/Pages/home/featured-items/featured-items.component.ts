import { Component} from '@angular/core';
import { CardsComponent } from "./cards/cards.component";

@Component({
  selector: 'app-featured-items',
  imports: [CardsComponent],
  templateUrl: './featured-items.component.html',
  styleUrl: './featured-items.component.scss'
})
export class FeaturedItemsComponent {

}
