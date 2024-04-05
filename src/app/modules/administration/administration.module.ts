import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcceptReservationComponent } from './pages/accept-reservation/accept-reservation.component';
import { AddReservationComponent } from './pages/add-reservation/add-reservation.component';
import { AppartmentGestionComponent } from './pages/appartment-gestion/appartment-gestion.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OccupationsComponent } from './components/occupations/occupations.component';
import { FormsModule } from '@angular/forms';
import { AdministrationComponent } from './administration.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    AcceptReservationComponent,
    AddReservationComponent,
    AppartmentGestionComponent,
    NavbarComponent,
    OccupationsComponent,
    AdministrationComponent
  ],
  imports: [
    CommonModule, FormsModule, RouterModule
  ]
})
export class AdministrationModule { }
