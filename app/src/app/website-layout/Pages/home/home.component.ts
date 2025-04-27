import { Component } from '@angular/core';
import { CarouselComponent } from "./carousel/carousel.component";
import { FeaturedItemsComponent } from "./featured-items/featured-items.component";
import { ShopNowBannerComponent } from "./shop-now-banner/shop-now-banner.component";
import { CategoryComponent } from './category/category.component';
@Component({
  selector: 'app-home',
  imports: [CarouselComponent, FeaturedItemsComponent, ShopNowBannerComponent,CategoryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
