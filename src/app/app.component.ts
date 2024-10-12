import {Component} from '@angular/core';
import {AuthService} from "./auth/Auth.service";
import {StateManagerService} from "./shared/globalServices/StateManager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private authService: AuthService, private stateManagerService: StateManagerService) {

  }

  ngOnInit(): void {
    //TODO: WYJEBAC POTEM
    if(!this.authService.getLoggedInFlag()) {
      this.authService.loginUser({ identifier: "TestUser2", password: "password2!"}).subscribe({
        next: value => {
            this.stateManagerService.updateLoggedInSubject(value);
        },
        error: err => {
          console.log(err);
        }
      })
    }
  }
}
