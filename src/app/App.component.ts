import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './App.component.html',
    styleUrl: './App.component.scss',
    standalone: false
})
export class AppComponent implements OnInit {
  private prefersDarkMode: boolean = false;
  protected navbarDisabledUrlList: String[] = [
    "dashboard"
  ];

  constructor() {

  }

  ngOnInit(): void {
    this.prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDefaultColorTheme(this.prefersDarkMode);
  }

  private setDefaultColorTheme(theme: boolean): void {
    const element: HTMLHtmlElement | null = document.querySelector('html');
    if (element) {
      if(theme) {
        element.classList.toggle('my-app-dark');
      }
    }
  }
}
