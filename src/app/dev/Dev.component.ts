import { Component } from '@angular/core';
import { GlobalErrorHandlerService } from "../shared/globalErrorHandler/GlobalErrorHandler.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-dev',
  templateUrl: './Dev.component.html',
  styleUrl: './Dev.component.scss'
})
export class DevComponent {
  errorSubscription!: Subscription;
  displayError!: string;

  constructor(private globalErrorHandlerService: GlobalErrorHandlerService) { }

  ngOnInit() {
    this.errorSubscription = this.globalErrorHandlerService.errorSubject$.subscribe((error: Error | null) => {
        console.log("triggered", error);
    });
  }

  public errorTest(): void {
      throw new Error('Async Test Error');
  }


  public errorTest2(): void {
    console.log(this.globalErrorHandlerService.errorSubject.getValue());
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
