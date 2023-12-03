import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSectionAdminComponent } from './session-section-admin.component';

describe('SessionSectionAdminComponent', () => {
  let component: SessionSectionAdminComponent;
  let fixture: ComponentFixture<SessionSectionAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SessionSectionAdminComponent]
    });
    fixture = TestBed.createComponent(SessionSectionAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
