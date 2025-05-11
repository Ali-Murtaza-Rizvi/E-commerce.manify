import { ComponentFixture, TestBed } from '@angular/core/testing';
import { YouMayLikeComponent } from './you-may-like.component';
import { of } from 'rxjs';

// Mock services
const mockCartService = {
  addToCart: jasmine.createSpy('addToCart')
};

const mockProductService = {
  getProducts: jasmine.createSpy('getProducts').and.returnValue(of([
    { name: 'Product1', title: 'Test 1', img: 'img1.jpg', detail: 'Detail 1', price: 100 },
    { name: 'Product2', title: 'Test 2', img: 'img2.jpg', detail: 'Detail 2', price: 200 },
    { name: 'Product3', title: 'Test 3', img: 'img3.jpg', detail: 'Detail 3', price: 300 }
  ]))
};

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

describe('YouMayLikeComponent', () => {
  let component: YouMayLikeComponent;
  let fixture: ComponentFixture<YouMayLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouMayLikeComponent],
      providers: [
        { provide: 'CartService', useValue: mockCartService },
        { provide: 'ProductService', useValue: mockProductService },
        { provide: 'Router', useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(YouMayLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products and paginate correctly', () => {
    expect(component.YouMayLikeProducts.length).toBe(3);
    expect(component.paginatedProducts.length).toBeGreaterThan(0);
  });
});
