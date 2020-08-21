import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { PollViewModel, PollResult, GraphResult } from 'src/app/models/poll';
import { PollService } from 'src/app/services/poll/poll.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { barChartOptions, parseOptions, chartOptions } from 'src/app/variables/charts';
import Chart from 'chart.js';

@Component({
  selector: 'app-results-poll',
  templateUrl: './results-poll.component.html',
  styleUrls: ['./results-poll.component.scss']
})
export class ResultsPollComponent implements OnInit {

  title = '';
  type = 'BarChart';
  data = [];
  responseData = new PollResult();
  public pollChart;
  chartPoll: any;

  constructor(private _overlayService: OverlayService,
    private _activateRoute: ActivatedRoute,
    private _pollService: PollService,
    private _snackBar: MatSnackBar) {
    this._overlayService.show();
    this._activateRoute.params.subscribe((data) => {
      const routeGuid: string = data['id'];
      this._pollService.result(routeGuid).subscribe(
        (data: PollResult) => {
          this.setGraphData(data);
          this.responseData = data;
          this._overlayService.hide();
        },
        error => {
          this._overlayService.hide();
          this._snackBar.open('OOPS !!! You got wrong poll details', 'Dismiss');
        });
    });
  }

  ngOnInit() {
    this.chartPoll = document.getElementById('chart-poll');
    parseOptions(Chart, chartOptions());

    this.pollChart = new Chart(this.chartPoll, {
      type: 'horizontalBar',
      options: barChartOptions.options,
      data: barChartOptions.data
    });

  }

  setGraphData(result: any) {
    this.title = result.question;
    let labels = [];
    let dataValues = [];

    const max = result.options.reduce(this.getTotal);

    result.options.forEach(element => {
      labels.push(element.label);
      dataValues.push(element.count);
    });

    this.updateOptions(labels, dataValues);
  }

  getTotal(previousArray: GraphResult, nextArray: GraphResult) {
    return { count: (previousArray.count + nextArray.count) };
  }

  public updateOptions(labels,dataValues) {
    this.pollChart.data.datasets[0].data = dataValues;
    this.pollChart.data.labels = labels;
    this.pollChart.update();
  }
}
