import {Component, OnInit} from '@angular/core';
import {QuoteComponent} from './quote/quote.component';
import {MoodTrackerComponent} from './mood-tracker/mood-tracker.component';
import {BackgroundService} from './services/background.service';
import {NgIf, NgStyle} from '@angular/common';
import {catchError, of, timeout} from 'rxjs';
import {ClockWithDateComponent} from './clock-with-date/clock-with-date.component';
import {SVG_PATHS} from './shared-components/svg-paths';
import {TopBarComponent} from './top-bar/top-bar.component';
import {SettingService} from './services/setting.service';

@Component({
  selector: 'app-root',
  imports: [
    QuoteComponent,
    MoodTrackerComponent,
    NgStyle,
    ClockWithDateComponent,
    TopBarComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  private apiTimeout = 1000;
  backgroundImageUrl: string = '';
  svgPaths = SVG_PATHS;

  constructor(private backgroundService: BackgroundService, public settingService: SettingService) {
  }

  ngOnInit(): void {
    this.loadBackgroundImage()
  }

  loadBackgroundImage() {
    this.backgroundService.getRandomBackground()
      .pipe(
        timeout(this.apiTimeout),
        catchError(() => {
          console.error('Failed to fetch background. Using default image.');
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data && data[0]?.urls?.regular) {
          this.backgroundImageUrl = data[0].urls.regular;
        } else {
          this.backgroundImageUrl = '/assets/images/background1.jpg';
        }
      })
  }
}

