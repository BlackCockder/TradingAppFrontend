import {Component} from '@angular/core';

import {AuthService} from "../auth/Auth.service";

@Component({
    selector: 'app-dev',
    templateUrl: './Dev.component.html',
    styleUrl: './Dev.component.scss',
    standalone: false
})
export class DevComponent {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    // throw new Error('Test error from dev component');

  }


  protected login(rememberMe: boolean): void {
    this.authService.loginUser({identifier: "TestUser2", password: "password2!", rememberMe: rememberMe}).subscribe((value) => {
      console.log(value);
    })
  }

  ngOnDestroy(): void {
  }

}
