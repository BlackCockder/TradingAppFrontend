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
    this.errorSubscription = this.globalErrorHandlerService.getErrorSubjectObservable().subscribe((error: Error | null) => {
      if (error) {
        this.displayError = error.message;
      }
    });
  }

  public errorTest(): void {
    throw new Error('nigger');
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
