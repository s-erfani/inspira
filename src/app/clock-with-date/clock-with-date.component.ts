import { Component } from '@angular/core';
import {ClockComponent} from './clock/clock.component';
import {DateDisplayComponent} from './date-display/date-display.component';
import {SettingService} from '../services/setting.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-clock-with-date',
  imports: [
    ClockComponent,
    DateDisplayComponent,
    NgIf
  ],
  templateUrl: './clock-with-date.component.html',
})
export class ClockWithDateComponent {
constructor(public settingService : SettingService) {
}
}
