import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesViewComponent } from './classes-view.component';

describe('ClassesViewComponent', () => {
  let component: ClassesViewComponent;
  let fixture: ComponentFixture<ClassesViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassesViewComponent]
    });
    fixture = TestBed.createComponent(ClassesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
