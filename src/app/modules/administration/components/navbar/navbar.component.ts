import { Component, OnDestroy } from '@angular/core';
import { LoginService } from '../../../../shared/login.service';
import { Subject, takeUntil } from 'rxjs';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnDestroy {

  constructor(private loginService: LoginService, private router: Router){}

showMenuBurger: boolean = false

destroy$: Subject<void> = new Subject()

setShowMenuBurger(): void {
  this.showMenuBurger = !this.showMenuBurger
}

logout(): void {
  console.log("quitter");
  
this.loginService.logout().pipe(takeUntil(this.destroy$)).subscribe(
  () => {this.router.navigate(['/'])},
  (error) => console.error(error)
  )
}


ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
}
}
