import {Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {SettingService} from '../services/setting.service';

@Component({
  selector: 'app-setting-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatSlideToggle,
    FormsModule,
    NgForOf
  ],
  templateUrl: './setting-dialog.component.html',
})
export class SettingDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SettingDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  settingKeys = [
    { key: 'clock', label: 'Clock' },
    { key: 'gregorianCalendar', label: 'Gregorian Calendar' },
    { key: 'persianCalendar', label: 'Persian Calendar' },
    { key: 'moodTracker', label: 'Mood Tracker' },
  ];

  constructor(public settingsService: SettingService) {}

  toggleSetting(key: keyof typeof this.settingsService.settings, value: boolean): void {
    this.settingsService.updateSetting(key, value);
  }

}
