import {Component} from '@angular/core';
import {AuthService} from "./auth/Auth.service";
import {LoginFormPayload} from "./auth/interfaces/LoginFormPayload.interface";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    if(this.authService.getRememberMeCredentials()) {
      this.authService.loginUser(<LoginFormPayload>this.authService.getRememberMeCredentials()).subscribe(() => {
      })
    }
  }
}
