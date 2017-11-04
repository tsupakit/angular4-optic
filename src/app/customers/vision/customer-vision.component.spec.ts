import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerVisionComponent } from './customer-vision.component';

describe('CustomerVisionComponent', () => {
  let component: CustomerVisionComponent;
  let fixture: ComponentFixture<CustomerVisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerVisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
