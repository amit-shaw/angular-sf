import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationQuestionComponent } from './registration-question.component';

describe('RegistrationQuestionComponent', () => {
  let component: RegistrationQuestionComponent;
  let fixture: ComponentFixture<RegistrationQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
