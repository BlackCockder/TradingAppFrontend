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
  private balanceData!: BalanceInterface;
  protected balances!: DisplayBalanceInterface[];

  constructor(private dashboardHeaderService: DashboardHeaderService, private authService: AuthService, private dataProcessingService: DataProcessingService) {
  }

  ngOnInit(): void {
    this.balanceData = {
      balance: 0,
      escrowBalance: 0,
      securityBalance: 0
    };
    this.balances = [
      {
        color: DisplayBalanceColors.BASE,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.BASE),
        balance: this.balanceData.balance
      },
      {
        color: DisplayBalanceColors.ESCROW,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.ESCROW),
        balance: this.balanceData.escrowBalance
      },
      {
        color: DisplayBalanceColors.SECURITY,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.SECURITY),
        balance: this.balanceData.securityBalance
      }
    ];
    if(this.authService.getLoggedInFlag()) {
      this.dashboardHeaderService.fetchBalanceData().subscribe({
        next: (value: BalanceInterface): void => {
          this.balanceData = value;
        },
        error: (err: any): void => {
          throw new Error("Failed to fetch balance data:", err);
        }
      });

    }
  }
}
