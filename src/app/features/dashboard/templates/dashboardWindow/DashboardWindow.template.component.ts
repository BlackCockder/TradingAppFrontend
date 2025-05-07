import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-dashboard-window-template',
    templateUrl: './DashboardWindow.template.component.html',
    styleUrl: './DashboardWindow.template.component.scss',
    standalone: false
})
export class DashboardWindowTemplateComponent {
  @Input() inputTitle!: string;
}
