import {Component} from '@angular/core';
import {AuthService} from "./auth/Auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    //TODO: WYJEBAC POTEM
    if(!this.authService.getLoggedInFlag()) {
      this.authService.loginUser({ identifier: "TestUser2", password: "password2!"}).subscribe({
        next: value => {
          if(value) {
          }
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }
}
