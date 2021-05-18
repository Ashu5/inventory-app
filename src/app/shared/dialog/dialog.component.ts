import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
 public message: string = "";
 public title:string="";
  public cancelButtonText = "OK"
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DialogComponent>) {

    if (data.message) {
      this.message = data.message || this.message;
    }
    if (data.title) {
      this.title=data.title || this.title;
    }
   
  }
}
