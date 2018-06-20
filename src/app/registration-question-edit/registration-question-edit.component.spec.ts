import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationQuestionEditComponent } from './registration-question-edit.component';

describe('RegistrationQuestionEditComponent', () => {
  let component: RegistrationQuestionEditComponent;
  let fixture: ComponentFixture<RegistrationQuestionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationQuestionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationQuestionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
