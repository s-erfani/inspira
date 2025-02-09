import {Component, inject, OnInit} from '@angular/core';
import {MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {MatNavList} from '@angular/material/list';
import {QuoteModel} from '../models/quote';
import {MatDivider} from '@angular/material/divider';
import {MatMenu, MatMenuTrigger} from '@angular/material/menu';
import {SVG_PATHS} from '../shared-components/svg-paths';
import {ShareMenuComponent} from '../shared-components/share-menu/share-menu.component';
import {NgScrollbar} from 'ngx-scrollbar';

@Component({
  selector: 'app-favorite-bottom-sheet',
  imports: [
    MatNavList,
    MatDivider,
    MatMenuTrigger,
    MatMenu,
    ShareMenuComponent,
    NgScrollbar,
  ],
  templateUrl: './favorite-bottom-sheet.component.html',
})
export class FavoriteBottomSheetComponent implements OnInit {
  svgPaths = SVG_PATHS;
  favorites: QuoteModel[] = [];
  private readonly _bottomSheetRef =
    inject<MatBottomSheetRef<FavoriteBottomSheetComponent>>(MatBottomSheetRef);

  ngOnInit(): void {
    this.favorites = JSON.parse(localStorage.getItem('favorites') ?? '[]')
  }

  removeFromFavorites(favoriteItem: any): void {
    this.favorites = this.favorites.filter(item => item !== favoriteItem);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    if (this.favorites.length == 0)
      this._bottomSheetRef.dismiss();
  }
}
