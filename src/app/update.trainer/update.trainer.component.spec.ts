import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrainerComponent } from './update.trainer.component';

describe('UpdateTrainerComponent', () => {
  let component: UpdateTrainerComponent;
  let fixture: ComponentFixture<UpdateTrainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateTrainerComponent]
    });
    fixture = TestBed.createComponent(UpdateTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
