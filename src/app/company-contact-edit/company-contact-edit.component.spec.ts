import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyContactEditComponent } from './company-contact-edit.component';

describe('CompanyContactEditComponent', () => {
  let component: CompanyContactEditComponent;
  let fixture: ComponentFixture<CompanyContactEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyContactEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyContactEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
