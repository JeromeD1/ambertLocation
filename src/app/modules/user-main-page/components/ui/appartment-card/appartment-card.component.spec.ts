import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppartmentCardComponent } from './appartment-card.component';

describe('AppartmentCardComponent', () => {
  let component: AppartmentCardComponent;
  let fixture: ComponentFixture<AppartmentCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppartmentCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppartmentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
