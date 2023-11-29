import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSectionComponent } from './class-section.component';

describe('ClassSectionComponent', () => {
  let component: ClassSectionComponent;
  let fixture: ComponentFixture<ClassSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassSectionComponent]
    });
    fixture = TestBed.createComponent(ClassSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
