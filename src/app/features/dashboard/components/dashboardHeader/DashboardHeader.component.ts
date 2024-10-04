import { Component } from '@angular/core';
import {DashboardHeaderService} from "./services/DashboardHeader.service";
import {AuthService} from "../../../../auth/Auth.service";
import {BalanceInterface} from "./interfaces/Balance.interface";
import {DisplayBalanceInterface} from "./interfaces/DisplayBalance.interface";
import {DisplayBalanceColors, DisplayBalanceSVGs} from "./enums/DisplayBalance.enum";
import {DataProcessingService} from "../../../../shared/globalServices/DataProcessing.service";
@Component({
  selector: 'app-dashboard-header',
  templateUrl: './DashboardHeader.component.html',
  styleUrl: './DashboardHeader.component.scss'
})
export class DashboardHeaderComponent {
  protected balances!: DisplayBalanceInterface[];

  constructor(private dashboardHeaderService: DashboardHeaderService, private authService: AuthService, private dataProcessingService: DataProcessingService) {
  }

  ngOnInit(): void {
    this.balances = [
      {
        color: DisplayBalanceColors.BASE,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.BASE),
        balance: 0
      },
      {
        color: DisplayBalanceColors.ESCROW,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.ESCROW),
        balance: 0
      },
      {
        color: DisplayBalanceColors.SECURITY,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.SECURITY),
        balance: 0
      }
    ];
    if(this.authService.getLoggedInFlag()) {
      this.dashboardHeaderService.fetchBalanceData().subscribe({
        next: (value: BalanceInterface): void => {
          this.balances[0].balance = value.balance;
          this.balances[1].balance = value.escrowBalance;
          this.balances[2].balance = value.securityBalance;
        },
        error: (err: any): void => {
          throw new Error("Failed to fetch balance data:", err);
        }
      });

    }
  }
}
