import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserMainPageRoutingModule } from './user-main-page-routing.module';
import { UserMainPageComponent } from './user-main-page.component';
import { HomeComponent } from './pages/home/home.component';
import { BookingGestionComponent } from './components/features/booking-gestion/booking-gestion.component';
import { TravellingChoicesComponent } from './components/ui/travelling-choices/travelling-choices.component';
import { ChooseVoyagersComponent } from './components/ui/choose-voyagers/choose-voyagers.component';
import { AppartmentCardComponent } from './components/ui/appartment-card/appartment-card.component';
import { PlusDeDetailsComponent } from './components/ui/plus-de-details/plus-de-details.component';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';
import { ToutesLesDispoComponent } from './components/ui/toutes-les-dispo/toutes-les-dispo.component';
import { DemandeReservationComponent } from './components/ui/demande-reservation/demande-reservation.component';
import { DatePickerComponent } from './components/ui/date-picker/date-picker.component';
import { ModeleEmailComponent } from './pages/modele-email/modele-email.component';
import { TravellingChoiceSmallScreenComponent } from './components/ui/travelling-choice-small-screen/travelling-choice-small-screen.component';



@NgModule({
  declarations: [
    UserMainPageComponent,
    HomeComponent,
    BookingGestionComponent,
    TravellingChoicesComponent,
    ChooseVoyagersComponent,
    AppartmentCardComponent,
    PlusDeDetailsComponent,
    SafeUrlPipe,
    ToutesLesDispoComponent,
    DemandeReservationComponent,
    DatePickerComponent,
    ModeleEmailComponent,
    TravellingChoiceSmallScreenComponent,
  ],
  imports: [
    CommonModule,
    UserMainPageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    
  ],
  exports: [
    UserMainPageComponent,
    SafeUrlPipe
  ]
})
export class UserMainPageModule { }
