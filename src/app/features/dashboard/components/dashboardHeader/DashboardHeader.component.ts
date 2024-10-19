import {Component} from '@angular/core';
import {DashboardHeaderService} from "./services/DashboardHeader.service";
import {AuthService} from "../../../../auth/Auth.service";
import {BalanceInterface} from "./interfaces/Balance.interface";
import {DisplayBalanceInterface} from "./interfaces/DisplayBalance.interface";
import {DisplayBalanceColors, DisplayBalanceSVGs} from "./enums/DisplayBalance.enum";
import {DataProcessingService} from "../../../../shared/globalServices/DataProcessing.service";
import {Subscription} from "rxjs";
import {StateManagerService} from "../../../../shared/globalServices/StateManager.service";

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './DashboardHeader.component.html',
  styleUrl: './DashboardHeader.component.scss'
})
export class DashboardHeaderComponent {
  protected balances!: DisplayBalanceInterface[];
  private loggedInStateSubscription!: Subscription;

  constructor(private dashboardHeaderService: DashboardHeaderService,
              private authService: AuthService,
              private dataProcessingService: DataProcessingService,
              private stateManagerService: StateManagerService) {
  }

  ngOnInit(): void {
    this.balances = [
      {
        color: DisplayBalanceColors.BASE,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.BASE),
        balance: "Loading..."
      },
      {
        color: DisplayBalanceColors.ESCROW,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.ESCROW),
        balance: "Loading..."
      },
      {
        color: DisplayBalanceColors.SECURITY,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.SECURITY),
        balance: "Loading..."
      }
    ];
    this.loggedInStateSubscription = this.stateManagerService.getLoggedInStateObservable()
      .subscribe((value: boolean) => {
      if (value) {
        this.dashboardHeaderService.fetchBalanceData().subscribe({
          next: (value: BalanceInterface): void => {
            this.balances[0].balance = '$' + value.balance;
            this.balances[1].balance = '$' + value.escrowBalance;
            this.balances[2].balance = '$' + value.securityBalance;
          },
          error: (err: any): void => {
            throw new Error("Failed to fetch balance data:", err);
          }
        });
      }
    })
  }

  ngOnDestroy(): void {
    this.loggedInStateSubscription.unsubscribe();
  }
}
