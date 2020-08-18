import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PollViewModel } from '../../models/poll';
import { PollService } from '../../services/poll/poll.service';
import { MatSnackBar } from '@angular/material';
import { OverlayService } from '../../shared/overlay/overlay.module';

@Component({
  selector: 'app-search-poll',
  templateUrl: './search-poll.component.html',
  styleUrls: ['./search-poll.component.scss']
})
export class SearchPollComponent implements OnInit {

  pollSearchText = '';
  pollExists = false;
  constructor(private _router: Router, private _pollService: PollService, private _snackBar: MatSnackBar,
    private _overlayService: OverlayService) { }

  ngOnInit() {
  }

  viewClick() {
    this.checkDetails('view');
  }

  resultsClick() {
    this.checkDetails('result');
  }

  checkDetails(type: string) {
    this._overlayService.show();
    this._pollService.getPoll(this.pollSearchText).subscribe(
      (data: PollViewModel) => {
        this._overlayService.hide();
        this.pollExists = true;
        this._router.navigate([`poll/${type}/` + this.pollSearchText]);
      },
      error => {
        this.pollExists = false;
        this._overlayService.hide();
        switch (error.error) {
          case 'PollNotFound':
            this.openDismiss('Invalid Poll', 'Dismiss');
            break;
          case 'PollEnded':
            if (type === 'result') {
              this._router.navigate([`poll/${type}/` + this.pollSearchText]);
              break;
            }
            this.openDismiss('The Poll you are looking for ended', 'Dismiss');
            break;
          default:
            this.openDismiss('Something went wrong', 'Dismiss');
            break;
        }
      });
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

}
