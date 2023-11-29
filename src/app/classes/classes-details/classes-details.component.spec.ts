import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesDetailsComponent } from './classes-details.component';

describe('ClassesDetailsComponent', () => {
  let component: ClassesDetailsComponent;
  let fixture: ComponentFixture<ClassesDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesDetailsComponent]
    });
    fixture = TestBed.createComponent(ClassesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
