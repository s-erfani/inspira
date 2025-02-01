import {Component, inject} from '@angular/core';
import {SVG_PATHS} from "../shared-components/svg-paths";
import {MatTooltip} from "@angular/material/tooltip";
import {FavoriteBottomSheetComponent} from '../favorite-bottom-sheet/favorite-bottom-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {SettingDialogComponent} from '../setting-dialog/setting-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

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
  private _snackBar = inject(MatSnackBar);

  openFavoriteBottomSheet() {
    if (JSON.parse(localStorage.getItem('favorites') || '[]').length == 0) {
      this._snackBar.open('No favorites found.', 'Okay', {
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    } else {
      this._bottomSheet.open(FavoriteBottomSheetComponent);
    }
  }

  openSettingDialog() {
    this.dialog.open(SettingDialogComponent, {});
  }

}
