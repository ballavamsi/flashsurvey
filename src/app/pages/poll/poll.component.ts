import { Component, OnInit } from '@angular/core';
import { PollViewModel, UserPollsViewModel, UserPollsResponseModel } from 'src/app/models/poll';
import { PollService } from 'src/app/services/poll/poll.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
// import * as Chart from 'chart.js';
// import * as ChartGeo from 'chartjs-chart-geo';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.scss']
})
export class PollComponent implements OnInit {

  currentPoll = new PollViewModel();
  pageNumber = 0;
  pageSize = 10;
  userPolls: UserPollsViewModel[];
  totalPolls = 0;
  currentPage = 0;
  totalPages = 1;

  constructor(private _pollService: PollService,
    private _snackBar: MatSnackBar,
    private _overlayService: OverlayService) {
    this.getPolls();
  }

  getPolls() {
    this._overlayService.show();
    this._pollService.getUserPolls(this.pageNumber, this.pageSize).subscribe((data: UserPollsResponseModel) => {
      this.userPolls = data.userPolls;
      this.totalPolls = data.totalPolls;
      this.totalPages = Math.ceil(this.totalPolls / this.pageSize);
      this._overlayService.hide();
    },
      error => {
        this._overlayService.hide();
        this.openDismiss(error.error, "Dismiss");
      });
  }

  getCurrentPagePolls(pagenumber) {
    this.pageNumber = pagenumber;
    this.currentPage = pagenumber;
    this.getPolls();
  }

  ngOnInit() { }

  askDeleteConfirmation(pollId, pollGuid, pollName) {
    this.currentPoll.name = pollName;
    this.currentPoll.pollGuid = pollGuid;
    this.currentPoll.pollId = pollId;
  }

  counter(i: number) {
    return new Array(i);
  }

  deletePoll(pollId) {
    this._overlayService.show();
    this._pollService.deletePoll(pollId).subscribe((data) => {
      this.openDismiss("Deleted successfully", "Dismiss");
      this.getCurrentPagePolls(this.currentPage);
    },
      error => {
        this._overlayService.hide();
        switch (error.error) {
          case 'InvalidOperation':
            this.openDismiss("You are no longer authorized to delete this poll", "Dismiss");
            break;
          default:
            this.openDismiss("Something went wrong we can investiage further", "Dismiss");
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
