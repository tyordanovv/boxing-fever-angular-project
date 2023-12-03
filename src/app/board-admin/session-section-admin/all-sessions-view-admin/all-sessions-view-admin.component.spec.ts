import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSessionsViewAdminComponent } from './all-sessions-view-admin.component';

describe('AllSessionsViewComponent', () => {
  let component: AllSessionsViewAdminComponent;
  let fixture: ComponentFixture<AllSessionsViewAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSessionsViewAdminComponent]
    });
    fixture = TestBed.createComponent(AllSessionsViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
