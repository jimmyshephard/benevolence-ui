import { Component, Input } from '@angular/core';
import { AlertPanelConfig } from './alert-panel.config';


@Component({
  selector: 'app-alert-panel',
  templateUrl: './alert-panel.component.html',
  styleUrls: ['./alert-panel.component.scss'],
})
export class AlertPanelComponent {

  @Input() config: AlertPanelConfig;

  toggleAlertMessage(): void {
    this.config.showMessage = !this.config.showMessage;
  }
}
