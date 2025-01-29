import {Component} from '@angular/core';
import {DatePipe, NgIf} from '@angular/common';
import {SettingService} from '../../services/setting.service';

@Component({
  selector: 'app-date-display',
  imports: [
    DatePipe,
    NgIf
  ],
  templateUrl: './date-display.component.html',
})
export class DateDisplayComponent {
  currentDate!: Date;
  persianDate!: string;

  constructor(public settingService : SettingService) {
    setTimeout(() => {
      this.currentDate = new Date();
      this.persianDate = new Intl.DateTimeFormat('fa-IR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).format(this.currentDate);
      this.persianDate = this.persianDate.replace(/\//g, ' / ');
    }, 1000);
  }
}
