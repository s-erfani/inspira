import {Component} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {SVG_PATHS} from '../shared-components/svg-paths';

const messages: { bad: string[], neutral: string[], good: string[] } = {
  bad: [
    "It's okay to feel this way. Take a deep breath and give yourself some time.",
    "Every day is a new chance to start fresh. Hang in there!",
    "You're stronger than you think. Tough times don't last forever.",
    "Tough times never last, but tough people do. – Robert H. Schuller",
    "It's just a bad day, not a bad life.",
    "Every storm runs out of rain eventually.",
    "Take things one step at a time. Progress is still progress.",
    "Sometimes the darkest storms bring the brightest rainbows.",
    "Allow yourself to feel and heal. Brighter days are ahead.",
    "Be gentle with yourself; you're doing the best you can."
  ],
  neutral: [
    "You're doing great! Maybe try something you enjoy to brighten your day.",
    "A calm day is a good day. Keep up the balance!",
    "Neutral is good — why not treat yourself to something nice?",
    "Life is 10% what happens to us and 90% how we react to it. – Charles R. Swindoll",
    "A calm mind brings inner strength and self-confidence.",
    "Balance is not something you find, it's something you create.",
    "Contentment is the key to a peaceful mind.",
    "Small joys make life meaningful; look for them today.",
    "Neutral days can be a great time to plan and reflect.",
    "Find joy in the small things and let them add up."
  ],
  good: [
    "Keep the positivity flowing! You're doing amazing!",
    "Spread the good vibes — you never know whose day you'll make better.",
    "Great mood, great energy — keep shining!",
    "Happiness is not something ready-made. It comes from your own actions. – Dalai Lama",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "A joyful heart is the inevitable result of a heart burning with love.",
    "Your smile could light up someone's entire day. Keep sharing it!",
    "You’re riding a wave of positivity — enjoy it to the fullest!",
    "Happiness is contagious. Share it wherever you go!",
    "Today is your day to shine. Bask in the glow of your good mood!"
  ]
};

@Component({
  selector: 'app-mood-tracker',
  imports: [],
  templateUrl: './mood-tracker.component.html',
  animations: [
    trigger('fadeAnimation', [
      transition(':leave', [
        animate('500ms ease-out', style({opacity: 0}))
      ]),
      transition(':enter', [
        style({opacity: 0}),
        animate('500ms ease-in', style({opacity: 1}))
      ])
    ]),
  ]
})
export class MoodTrackerComponent {
  svgPaths = SVG_PATHS;
  moodMessage: string = '';
  messageVisibility = 'hidden';

  setMoodMessage(mood: 'bad' | 'neutral' | 'good'): void {
    setTimeout(() => {
      this.moodMessage = messages[mood][Math.floor(Math.random() * messages[mood].length)];
      this.messageVisibility = 'visible';
    }, 0);
  }
}
