import {Component} from '@angular/core';
import {DashboardHeaderService} from "./services/DashboardHeader.service";
import {AuthService} from "../../../../auth/Auth.service";
import {BalanceInterface} from "../../../../shared/globalServices/Balance.interface";
import {DisplayBalanceInterface} from "./interfaces/DisplayBalance.interface";
import {DisplayBalanceColors, DisplayBalanceSVGs} from "./enums/DisplayBalance.enum";
import {DataProcessingService} from "../../../../shared/globalServices/DataProcessing.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-dashboard-header',
    templateUrl: './DashboardHeader.component.html',
    styleUrl: './DashboardHeader.component.scss',
    standalone: false
})
export class DashboardHeaderComponent {
  protected balances!: DisplayBalanceInterface[];
  private balanceData!: BalanceInterface;
  private balancesToggleStatus!: boolean;
  private isToggling!: boolean;
  private balancesToggleAnimationLength: number = 300;

  constructor(private dashboardHeaderService: DashboardHeaderService,
              private authService: AuthService,
              private dataProcessingService: DataProcessingService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.balanceData = this.route.snapshot.data['balanceData'];
    this.balances = [
      {
        color: DisplayBalanceColors.BASE,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.BASE),
        balance: '$' + this.balanceData.balance
      },
      {
        color: DisplayBalanceColors.ESCROW,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.ESCROW),
        balance: '$' + this.balanceData.securityBalance
      },
      {
        color: DisplayBalanceColors.SECURITY,
        svg: this.dataProcessingService.sanitizeSVG(DisplayBalanceSVGs.SECURITY),
        balance: '$' + this.balanceData.securityBalance
      }
    ];
    this.isToggling = false;
    this.balancesToggleStatus = false;
  }

  //TODO: Finish the toggleable button
  protected toggleBalancesVisibility(): void {
    if (this.isToggling) {
      return;
    }
    this.isToggling = true;
    this.balancesToggleStatus = !this.balancesToggleStatus;

    setTimeout(() => {
      this.isToggling = false;
    }, this.balancesToggleAnimationLength);
  }

}
