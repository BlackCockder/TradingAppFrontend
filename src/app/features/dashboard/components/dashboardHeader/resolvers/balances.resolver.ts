import { ResolveFn } from '@angular/router';
import {BalanceInterface} from "../../../../../shared/globalServices/Balance.interface";
import {HttpClient} from "@angular/common/http";
import {inject} from "@angular/core";
import {SERVER_IP} from "../../../../../../main";
import {Observable} from "rxjs";
import {AuthService} from "../../../../../auth/Auth.service";

//TODO: Change to WebSocket when introduced - moved from dashboardHeader service
export const balancesResolver: ResolveFn<BalanceInterface> = (route, state): Observable<BalanceInterface> => {
  const http: HttpClient = inject(HttpClient);
  const authService: AuthService = inject(AuthService);
  return http.get<BalanceInterface>(`${SERVER_IP}api/${authService.getUserID()}/getBalances`, {headers: authService.authorizationNeeded()});
};
