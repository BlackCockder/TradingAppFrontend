import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SERVER_IP} from "../../../../../main";
import {AuthService} from "../../../../auth/Auth.service";

@Component({
    selector: 'app-services',
    templateUrl: './services.component.html',
    styleUrl: './services.component.scss',
    standalone: false
})
export class ServicesComponent {
  protected offerDescription!: string;

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.offerDescription = '';
    // this.http.post(`${serverIP}api/category/createCategory`, {categoryName: 'category1', gameName: 'game1'}, {headers: this.authService.authorizationNeeded(), responseType: 'text'}).subscribe(value => {
    //   console.log(value);
    // })
  }

}
