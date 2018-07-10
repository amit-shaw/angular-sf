import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiversityEditComponent } from './diversity-edit.component';

describe('DiversityEditComponent', () => {
  let component: DiversityEditComponent;
  let fixture: ComponentFixture<DiversityEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiversityEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiversityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
