import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTicketsComponent } from './display-tickets.component';

describe('DisplayTicketsComponent', () => {
  let component: DisplayTicketsComponent;
  let fixture: ComponentFixture<DisplayTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
