import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './modules/administration/administration.component';
import { AcceptReservationComponent } from './modules/administration/pages/accept-reservation/accept-reservation.component';
import { AddReservationComponent } from './modules/administration/pages/add-reservation/add-reservation.component';
import { AppartmentGestionComponent } from './modules/administration/pages/appartment-gestion/appartment-gestion.component';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  { path: 'home', loadChildren: () => import('./modules/user-main-page/user-main-page.module').then(m => m.UserMainPageModule) },
  {path: 'admin', component: AdministrationComponent, children:[
    {path:'', redirectTo:'/admin/acceptResa', pathMatch:'full'},
    {path:'acceptResa', component: AcceptReservationComponent},
    {path:'addResa', component: AddReservationComponent},
    {path:'appartGestion', component: AppartmentGestionComponent},

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
