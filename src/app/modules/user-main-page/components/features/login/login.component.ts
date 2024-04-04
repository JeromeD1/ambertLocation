import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @Output()
  closeEmitter: EventEmitter<void> = new EventEmitter()

  login: string = ""
  password: string = ""

  closeLogin(): void {
    this.closeEmitter.emit()
  }

  onSubmit(): void {
    const formData = {
      login: this.login,
      password: this.password
    }


    this.closeLogin()
  }
}
