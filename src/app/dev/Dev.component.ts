import {Component} from '@angular/core';
import {GlobalErrorHandlerService} from "../shared/globalErrorHandler/GlobalErrorHandler.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dev',
  templateUrl: './Dev.component.html',
  styleUrl: './Dev.component.scss'
})
export class DevComponent {
  errorSubscription!: Subscription;
  displayError!: string;

  constructor(private globalErrorHandlerService: GlobalErrorHandlerService) {
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

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }

  protected autoLogin(enable: boolean): void {
    enable ? localStorage.setItem('rememberMe', JSON.stringify({ identifier: "TestUser2", password: "password2!"})) : localStorage.removeItem('rememberMe');
  }
}
