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


@NgModule({
  declarations: [
    UserMainPageComponent,
    HomeComponent,
    BookingGestionComponent,
    TravellingChoicesComponent,
    ChooseVoyagersComponent,
    AppartmentCardComponent
  ],
  imports: [
    CommonModule,
    UserMainPageRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    UserMainPageComponent
  ]
})
export class UserMainPageModule { }
