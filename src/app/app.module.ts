import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserMainPageModule } from './modules/user-main-page/user-main-page.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdministrationModule } from './modules/administration/administration.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserMainPageModule,
    AdministrationModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
