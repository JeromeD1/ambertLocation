import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleEmailComponent } from './modele-email.component';

describe('ModeleEmailComponent', () => {
  let component: ModeleEmailComponent;
  let fixture: ComponentFixture<ModeleEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModeleEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModeleEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
