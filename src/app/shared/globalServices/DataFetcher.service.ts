import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BalanceInterface} from "./Balance.interface";
import {AuthService} from "../../auth/Auth.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {SERVER_IP} from "../../../main";

@Injectable({
  providedIn: 'root'
})
export class DataFetcherService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public fetchBalances(): Observable<BalanceInterface> {
    return this.http.get<BalanceInterface>(`${SERVER_IP}api/${this.authService.getUserID()}/getBalances`, { headers: this.authService.authorizationNeeded(), observe: 'response' }).pipe(
      map((response: HttpResponse<BalanceInterface>) => {
        if (!response.body) {
          throw new Error('Backend error');
        }
        return response.body;
      }),
      catchError(error => {
        return throwError(() => new Error('Failed to fetch balance', error));
      })
    );
  }
}
