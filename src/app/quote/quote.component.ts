import {Component, OnInit} from '@angular/core';
import {QuoteModel} from '../models/quote';
import quotesList from "../../assets/quotes.json"
import {MatTooltip} from '@angular/material/tooltip';
import {NgClass, NgIf} from '@angular/common';
import {animate, keyframes, style, transition, trigger} from '@angular/animations';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {SVG_PATHS} from '../shared-components/svg-paths';
import {ShareMenuComponent} from '../shared-components/share-menu/share-menu.component';

@Component({
  selector: 'app-quote',
  imports: [
    MatTooltip,
    NgClass,
    NgIf,
    MatMenuTrigger,
    MatMenu,
    ShareMenuComponent
  ],
  templateUrl: './quote.component.html',
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
    trigger('shakeAnimation', [
      transition('* => *', [
        animate('300ms ease-in-out', keyframes([
          style({transform: 'translateX(0)', offset: 0}),
          style({transform: 'translateX(-3px)', offset: 0.25}),
          style({transform: 'translateX(3px)', offset: 0.5}),
          style({transform: 'translateX(-3px)', offset: 0.75}),
          style({transform: 'translateX(0)', offset: 1})
        ]))
      ])
    ])
  ],
})

export class QuoteComponent implements OnInit {
  svgPaths = SVG_PATHS;
  selectedQuote!: QuoteModel;
  favorites: QuoteModel[] = [];
  showQuote: boolean = true;
  invalidAuthors: string[] = ['unknown', 'Unknown', 'anonymous', 'Anonymous', 'Proverb', 'proverb', 'Latin Proverb']
  shakeCounter: number = 0;

  ngOnInit(): void {
    this.loadFavorites();
    this.selectRandomQuote();
  }

  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem('favorites');
    this.favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
  }

  private selectRandomQuote(): void {
    const randomIndex = Math.floor(Math.random() * quotesList.quotes.length);
    this.selectedQuote = quotesList.quotes[randomIndex];
  }

  addToFavorites(quoteItem: QuoteModel): void {
    if (!this.isFavorite(quoteItem)) {
      this.favorites.push(quoteItem);
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
      this.shakeCounter++;
    }
  }

  isFavorite(quoteItem: QuoteModel): boolean {
    return this.favorites.some(fav =>
      fav.quote === quoteItem.quote && fav.author === quoteItem.author
    );
  }

  skipQuote(): void {
    this.showQuote = false;
    setTimeout(() => {
      this.selectRandomQuote();
      this.showQuote = true;
    }, 500);
  }

  searchOnGoogle(author: string, event: MouseEvent) {
    if (!this.invalidAuthors.includes(author)) {
      event.preventDefault();
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(author)}`;
      window.open(googleSearchUrl, '_blank');
    }
  }
}
