import { Component, OnInit, HostListener } from '@angular/core';
import { PollService } from '../../services/poll/poll.service';
import { ActivatedRoute } from '@angular/router';
import { PollResult, PollOptionVote, GraphResult } from '../../models/poll';
import { OverlayService } from '../../shared/overlay/overlay.module';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-result-poll',
  templateUrl: './result-poll.component.html',
  styleUrls: ['./result-poll.component.css']
})
export class ResultPollComponent implements OnInit {

  screenHeight: number;
  screenWidth: number;
  title = '';
  type = 'BarChart';
  data = [];
  responseData: PollResult;
  columnNames = ['Question', 'Options', { role: 'tooltip' }];
  options = {
    chartArea: 'left',
    colors: ['#4f3961', '#ea728c', '#fc9d9d', '#f3d4d4', '#ffbd69', '#fe346e', '#b21f66'],
    titleTextStyle: {
      fontName: 'Roboto, "Helvetica Neue", sans-serif',
      fontSize: 20
    },
    legend: {
      position: 'right',
      textStyle: {
        fontName: 'Roboto, "Helvetica Neue", sans-serif',
        fontSize: 12
      },
      maxLines: 20
    },
    vAxis: { maxValue: 10 },
    is3D: false,
    pieHole: 0.4
  };
  width = 0;
  height = 0;

  constructor(private _pollService: PollService, private _activateRoute: ActivatedRoute, private _overlay: OverlayService,
    private _snackBar: MatSnackBar) {
    this._overlay.show();
    this.getScreenSize();
    this.width = (this.screenWidth);
    this.height = (this.screenHeight);
    // Get Poll results
    this._activateRoute.params.subscribe((data) => {
      const routeGuid: string = data['id'];
      this._pollService.result(routeGuid).subscribe(
        (data: PollResult) => {
          this.setGraphData(data);
          this.responseData = data;
          this._overlay.hide();
        },
        error => {
          this._overlay.hide();
          this._snackBar.open('OOPS !!! You got wrong poll details', 'Dismiss');
        });
    });
  }

  ngOnInit() {
  }

  setGraphData(result: any) {
    this.title = result.question;
    this.data = [];

    const max = result.options.reduce(this.getTotal);

    result.options.forEach(element => {
      let percent = ((element.count) / max.count) * 100;
      this.data.push([element.label, element.count, percent.toFixed(2) + '%']);
    });

  }

  getTotal(previousArray: GraphResult, nextArray: GraphResult) {
    return { count : (previousArray.count + nextArray.count)};
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

}
