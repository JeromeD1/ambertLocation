import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

showMenuBurger: boolean = false

setShowMenuBurger(): void {
  this.showMenuBurger = !this.showMenuBurger
}

}
