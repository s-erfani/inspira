import {Component, inject} from '@angular/core';
import {SVG_PATHS} from "../shared-components/svg-paths";
import {MatTooltip} from "@angular/material/tooltip";
import {FavoriteBottomSheetComponent} from '../favorite-bottom-sheet/favorite-bottom-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {SettingDialogComponent} from '../setting-dialog/setting-dialog.component';

@Component({
  selector: 'app-top-bar',
  imports: [
    MatTooltip
  ],
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  protected readonly svgPaths = SVG_PATHS;
  private _bottomSheet = inject(MatBottomSheet);
  readonly dialog = inject(MatDialog);

  openFavoriteBottomSheet() {
    if (JSON.parse(localStorage.getItem('favorites') || '[]').length == 0) {
      alert("No favorites found.");
    } else {
      this._bottomSheet.open(FavoriteBottomSheetComponent);
    }
  }

  openSettingDialog() {
    const dialogRef = this.dialog.open(SettingDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
      }
    });
  }

}
