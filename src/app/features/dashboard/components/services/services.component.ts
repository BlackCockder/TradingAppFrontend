import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  protected offerDescription!: string;

  ngOnInit(): void {
    this.offerDescription = '';
  }

}
