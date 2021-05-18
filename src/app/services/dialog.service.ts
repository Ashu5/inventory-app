import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  public dialogRef!: MatDialogRef<DialogComponent>;
  public constructor( private dialog: MatDialog) { }


  public openDialog(
    title:any,
    message:any): void {
    this.dialogRef = this.dialog.open(DialogComponent, {
      width:"300px",
      height:"200px",
      data: {
        title,
        message
      }
    });
   
  }
}
