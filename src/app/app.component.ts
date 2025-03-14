import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  protected navbarDisabledUrlList: String[] = [
    "dashboard"
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

}
