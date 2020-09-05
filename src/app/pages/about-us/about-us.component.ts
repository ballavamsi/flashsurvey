import {MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutUsComponent implements OnInit, OnDestroy {

  //constructor(){}
  constructor(public _snackBar: MatSnackBar) { }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-white");
  }

  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-white");
  }

  onClickCopy(message: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = message;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    const config = new MatSnackBarConfig();
    config.duration = 400;
    this._snackBar.open('Copied to clipboard','Dismiss', config);
  }
}
