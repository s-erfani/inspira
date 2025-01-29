import { Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  imports: [],
  templateUrl: './clock.component.html',
})
export class ClockComponent {
  time!: any;

  constructor() {
    setInterval(() => {
      const currentDate = new Date();
      this.time = currentDate.toLocaleTimeString();
    }, 1000);
  }
}
