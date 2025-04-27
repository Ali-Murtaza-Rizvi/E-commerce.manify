import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouMayLikeComponent } from './you-may-like.component';

describe('YouMayLikeComponent', () => {
  let component: YouMayLikeComponent;
  let fixture: ComponentFixture<YouMayLikeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouMayLikeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouMayLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
