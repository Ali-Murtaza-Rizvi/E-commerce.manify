import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopNowBannerComponent } from './shop-now-banner.component';

describe('ShopNowBannerComponent', () => {
  let component: ShopNowBannerComponent;
  let fixture: ComponentFixture<ShopNowBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopNowBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopNowBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
