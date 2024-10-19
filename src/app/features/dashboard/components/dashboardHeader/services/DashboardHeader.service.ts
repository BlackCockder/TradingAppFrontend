import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BalanceInterface} from "../interfaces/Balance.interface";
import {AuthService} from "../../../../../auth/Auth.service";
import {SERVER_IP} from "../../../../../../main";

@Injectable({
  providedIn: 'root'
})
export class DashboardHeaderService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  //TODO: Change to WebSocket when introduced.
  public fetchBalanceData(): Observable<BalanceInterface> {
    return this.http.get<BalanceInterface>(`${SERVER_IP}api/${this.authService.getUserID()}/getBalances`, {headers: this.authService.authorizationNeeded()})
  }
}
