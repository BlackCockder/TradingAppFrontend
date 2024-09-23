import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dashboard-window-template',
  templateUrl: './DashboardWindow.template.component.html',
  styleUrl: './DashboardWindow.template.component.scss'
})
export class DashboardWindowTemplateComponent {
  @Input() inputTitle!: string;
}
