import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocailMediaEditComponent } from './socail-media-edit.component';

describe('SocailMediaEditComponent', () => {
  let component: SocailMediaEditComponent;
  let fixture: ComponentFixture<SocailMediaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocailMediaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocailMediaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
