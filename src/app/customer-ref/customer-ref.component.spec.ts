import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRefComponent } from './customer-ref.component';

describe('CustomerRefComponent', () => {
  let component: CustomerRefComponent;
  let fixture: ComponentFixture<CustomerRefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerRefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
