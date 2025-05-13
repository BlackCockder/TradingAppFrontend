import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './App.component.html',
    styleUrl: './App.component.scss',
    standalone: false
})
export class AppComponent {
  private prefersDarkMode: boolean = false;
  protected navbarDisabledUrlList: String[] = [
    "dashboard"
  ];

  constructor() {
    this.prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDefaultColorTheme(this.prefersDarkMode);
  }

  ngOnInit(): void {

  }

  protected toggleDarkMode(): void {
    const element: HTMLHtmlElement | null = document.querySelector('html');
    if (element) {
      element.classList.toggle('my-app-dark');
    }
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
