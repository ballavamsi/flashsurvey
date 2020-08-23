import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { ActivatedRoute } from '@angular/router';
import { PollViewModel, PollResult, GraphResult } from 'src/app/models/poll';
import { PollService } from 'src/app/services/poll/poll.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { barChartOptions, parseOptions, chartOptions, linearChartOptions, pieChartOptions, horizontalBarChartOptions } from 'src/app/variables/charts';
import Chart from 'chart.js';
import { Constants } from 'src/app/variables/constants';

@Component({
  selector: 'app-results-poll',
  templateUrl: './results-poll.component.html',
  styleUrls: ['./results-poll.component.scss']
})
export class ResultsPollComponent implements OnInit {

  title = '';
  data = [];
  responseData = new PollResult();
  public pollChart;
  chartPoll: any;
  chartType = '';

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

    this.chartType = Constants.HorizontalBarChart;

    this.pollChart = new Chart(this.chartPoll, {
      type: this.chartType,
      options: horizontalBarChartOptions.options,
      data: horizontalBarChartOptions.data
    });

  }



  // getRandomColor() {
  //   return '#' + (Math.random().toString(16) + '0000000').slice(2, 8);
  // }

  getColor(){
    return "hsl(" + 360 * Math.random() + ',' +
               (15 + 70 * Math.random()) + '%,' +
               (85 + 10 * Math.random()) + '%)'
  }

  setGraphData(result: any) {
    this.title = result.question;
    let labels = [];
    let dataValues = [];
    let colors = [];//'#CAC6B5','#244163','#3A75CA','#2E9562','#53C596'];

    const max = result.options.reduce(this.getTotal);

    let maxElementCount = 0;
    result.options.forEach(element => {
      if(maxElementCount < element.count){
        maxElementCount = element.count;
      }
    });

    result.options.forEach(element => {
      labels.push(element.label);
      dataValues.push(element.count);
      if(element.count != maxElementCount) {
        if(this.chartType != Constants.PieChart){
          colors.push('#53C596');
        }
        else {
          colors.push(this.getColor());
        }
      }
      else {
        colors.push('red');
      }
    });

    this.updateOptions(labels, dataValues, colors);
  }

  getTotal(previousArray: GraphResult, nextArray: GraphResult) {
    return { count: (previousArray.count + nextArray.count) };
  }

  public updateOptions(labels, dataValues, colors) {
    this.pollChart.data.datasets[0].data = dataValues;
    this.pollChart.data.datasets[0].backgroundColor = colors;
    this.pollChart.data.labels = labels;
    this.pollChart.update();
  }
}
