import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent, ConfirmDialogModel } from '../dialogs/confirm/confirm.component';
import { FileComponent } from '../dialogs/file/file.component';
import { InputComponent } from '../dialogs/input/input.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {}

  inputDialog(title: string, label: string) {
    const dialogRef = this.dialog.open(InputComponent, {
      width: '350px',
      data: {
        title,
        label
      }
    });
    return dialogRef.afterClosed();
  }

  fileUpload(title: string, label: string) {
    const dialogRef = this.dialog.open(FileComponent, {
      width: '350px',
      data: {
        title,
        label
      }
    });
    return dialogRef.afterClosed();
  }

  confirm(title: string, message: string): Observable<any> {
    const dialogData = new ConfirmDialogModel(title, message);
    const dialogRef = this.dialog.open(ConfirmComponent, {
      minWidth: '350px',
      data: dialogData
    });
    return dialogRef.afterClosed();
  }
}
