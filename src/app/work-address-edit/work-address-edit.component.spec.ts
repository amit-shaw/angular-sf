import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkAddressEditComponent } from './work-address-edit.component';

describe('WorkAddressEditComponent', () => {
  let component: WorkAddressEditComponent;
  let fixture: ComponentFixture<WorkAddressEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkAddressEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkAddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
