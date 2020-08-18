import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { VERSION, MatDialogRef, MatDialog, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlertDialogComponent {
  message: string = "";
  cancelButtonText = "Cancel";
  isHtmlText: boolean;
  heading: string;
  subheading: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    private _snackBar: MatSnackBar) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
      this.isHtmlText = ((data.isHtml) ? true : false);
      this.heading = data.heading;
      this.subheading = data.subheading;
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCopyClick(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.message;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this._snackBar.open('Copied to clipboard','Dismiss',{
      duration: 3000,
    });
  }
}
