import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private readonly SETTING_KEY = 'appSetting';

  settings: any = {
    clock: true,
    gregorianCalendar: true,
    persianCalendar: true,
    moodTracker: true,
  };

  constructor() {
    this.loadSettings();
  }

  private loadSettings(): void {
    const storedSettings = localStorage.getItem(this.SETTING_KEY);
    if (storedSettings) {
      this.settings = JSON.parse(storedSettings);
    }
  }

  updateSetting(key: any, value: boolean): void {
    this.settings[key] = value;
    localStorage.setItem(this.SETTING_KEY, JSON.stringify(this.settings));
  }

  getSetting(key:any): boolean {
    return this.settings[key];
  }
}
