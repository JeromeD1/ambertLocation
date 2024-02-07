import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserMainPageComponent } from './user-main-page.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: '', component: UserMainPageComponent },
  { path: 'home', component: HomeComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserMainPageRoutingModule { }
