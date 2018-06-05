import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NaicsCodeEditComponent } from './naics-code-edit.component';

describe('NaicsCodeEditComponent', () => {
  let component: NaicsCodeEditComponent;
  let fixture: ComponentFixture<NaicsCodeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NaicsCodeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NaicsCodeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
