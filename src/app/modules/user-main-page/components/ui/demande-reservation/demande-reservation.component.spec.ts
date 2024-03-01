import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeReservationComponent } from './demande-reservation.component';

describe('DemandeReservationComponent', () => {
  let component: DemandeReservationComponent;
  let fixture: ComponentFixture<DemandeReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DemandeReservationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DemandeReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
