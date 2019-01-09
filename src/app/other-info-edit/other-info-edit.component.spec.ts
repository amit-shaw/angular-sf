import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherInfoEditComponent } from './other-info-edit.component';

describe('OtherInfoEditComponent', () => {
  let component: OtherInfoEditComponent;
  let fixture: ComponentFixture<OtherInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
