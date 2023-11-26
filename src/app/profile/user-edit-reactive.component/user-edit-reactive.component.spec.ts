import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditReactiveComponent } from './user-edit-reactive.component';

describe('UserEditReactiveComponent', () => {
  let component: UserEditReactiveComponent;
  let fixture: ComponentFixture<UserEditReactiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditReactiveComponent]
    });
    fixture = TestBed.createComponent(UserEditReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
