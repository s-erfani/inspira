import {Component, OnInit} from '@angular/core';
import {QuoteComponent} from './quote/quote.component';
import {MoodTrackerComponent} from './mood-tracker/mood-tracker.component';
import {BackgroundService} from './services/background.service';
import {NgIf, NgStyle} from '@angular/common';
import {ClockWithDateComponent} from './clock-with-date/clock-with-date.component';
import {SVG_PATHS} from './shared-components/svg-paths';
import {TopBarComponent} from './top-bar/top-bar.component';
import {SettingService} from './services/setting.service';
import {GithubButtonComponent} from './github-button/github-button.component';

@Component({
  selector: 'app-root',
  imports: [
    QuoteComponent,
    MoodTrackerComponent,
    NgStyle,
    ClockWithDateComponent,
    TopBarComponent,
    NgIf,
    GithubButtonComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  backgroundImageUrl: string = '';
  svgPaths = SVG_PATHS;

  constructor(private backgroundService: BackgroundService, public settingService: SettingService) {
  }

  ngOnInit(): void {
    this.loadBackgroundImage()
  }

  loadBackgroundImage() {
    if (this.settingService.getSetting('dynamicBackground')) {
      this.backgroundService.getCachedBackgroundOrFetchNew().subscribe(imageUrl => {
        console.log(imageUrl);
        this.backgroundImageUrl = imageUrl;
      });
    } else {
      this.backgroundImageUrl = './images/background1.jpg';
    }
  }
}

