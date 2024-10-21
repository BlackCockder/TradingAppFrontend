import {Component} from '@angular/core';
import {GlobalErrorHandlerService} from "../shared/globalErrorHandler/GlobalErrorHandler.service";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/Auth.service";

@Component({
  selector: 'app-dev',
  templateUrl: './Dev.component.html',
  styleUrl: './Dev.component.scss'
})
export class DevComponent {
  errorSubscription!: Subscription;
  displayError!: string;

  constructor(private globalErrorHandlerService: GlobalErrorHandlerService, private authService: AuthService) {
  }

  ngOnInit() {
    this.displayError = 'Test the error!';
    this.errorSubscription = this.globalErrorHandlerService.getErrorSubjectObservable().subscribe((error: Error | null) => {
      if (error) {
        this.displayError = error.message;
      }
    });
  }

  public errorTest(): void {
    throw new Error('niggerrrrrrrrrrrrrrrrrrrrrrrrrr');
  }

  protected login(rememberMe: boolean): void {
    this.authService.loginUser({identifier: "TestUser2", password: "password2!", rememberMe: rememberMe}).subscribe((value) => {
      console.log(value);
    })
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

}
