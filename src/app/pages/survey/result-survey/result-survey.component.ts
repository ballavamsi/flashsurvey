import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { SurveyService } from 'src/app/services/survey/survey.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { SurveyModel, UserSurveyFeedbackResponseModel, UserSurveyFeedbacks, SurveyMetricsViewModel, QuestionMetricsViewModel } from 'src/app/models/survey';
import { parseOptions, chartOptions, horizontalBarChartOptions, lineChartOptions, twoLineChartOptions, scatterPlot } from 'src/app/variables/charts';
import { Constants } from 'src/app/variables/constants';
import Chart from 'chart.js';

@Component({
  selector: 'app-result-survey',
  templateUrl: './result-survey.component.html',
  styleUrls: ['./result-survey.component.scss']
})
export class ResultSurveyComponent implements OnInit {

  surveyTitle = '';
  userFeedbacks: UserSurveyFeedbacks[];
  feedbackMetrics: QuestionMetricsViewModel[];
  routeGuid: string;
  loaded = false;
  errorMessage = "";
  userfeedback ="";

  surveyId = 0;
  pageNumber = 0;
  pageSize = 10;
  totalFeedbacks = 0;
  currentPage = 0;
  totalPages = 1;

  listChart = [];

  constructor(private _activateRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _overlayService: OverlayService,
    private _surveyService: SurveyService,
    private _storageService: StorageService) {
    this._activateRoute.params.subscribe((data) => {
      this.routeGuid = data['id'];
      this._overlayService.show();
      this.getSurveyFeedbacks(this.routeGuid);
    });
  }

  ngOnInit() {
  }

  getSurveyFeedbacks(surveyGuid: string) {
    this._overlayService.show();
    this._surveyService.getSurveyFeedbacks(surveyGuid, this.pageNumber, this.pageSize).subscribe((data: UserSurveyFeedbackResponseModel) => {
      this.surveyTitle = data.surveyTitle;
      this.userFeedbacks = data.feedbacks;
      this.totalFeedbacks = data.total;
      this.totalPages = Math.ceil(this.totalFeedbacks / this.pageSize);
      this._overlayService.hide();
    },
      error => {
        this._overlayService.hide();
        this.openDismiss(error.error, "Dismiss");
      });
  }

  getCurrentPageSurveys(pagenumber) {
    this.pageNumber = pagenumber;
    this.currentPage = pagenumber;
    this.getSurveyFeedbacks(this.routeGuid);
  }

  getSurveyGraph() {
    this._overlayService.show();
    this._surveyService.getSurveyGraph(this.routeGuid).subscribe((data: SurveyMetricsViewModel) => {
      this.feedbackMetrics = data.questions;
      this._overlayService.hide();
    },
      error => {
        this._overlayService.hide();
        this.openDismiss(error.error, "Dismiss");
      });
    this.renderChart();
  }

  getSurveyUserFeedback(surveyUserGuid)
  {
    this._overlayService.show();
    this._surveyService.getSurveyUserFeedback(surveyUserGuid).subscribe((data: SurveyModel) => {
      this._overlayService.hide();
    },
      error => {
        this._overlayService.hide();
        this.openDismiss(error.error, "Dismiss");
      });
    this.renderChart();
  }

  renderChart() {
    var intervalObject = setInterval(() => {
      if (this.feedbackMetrics?.length > 0) {
        clearInterval(intervalObject);
        var firstChart = this.feedbackMetrics[0].questionType;
        if (firstChart != null) {
          this.createAllGraphs();
          this.updateAllGraphs();
        }
      }
    }, 20000);
  }



  createChart(chartId: string, chartType: string, options: any, data: any) {
    var chartVar = document.getElementById(chartId);
    parseOptions(Chart, chartOptions());

    var tempChart = new Chart(chartVar, {
      type: chartType,
      options: options,
      data: data
    });

    return tempChart;
  }

  public updateOptions(index, labels, dataValues, colors, dataSetNumber = 0) {
    this.listChart[index].data.datasets[dataSetNumber].data = dataValues;
    this.listChart[index].data.datasets[dataSetNumber].backgroundColor = colors;
    this.listChart[index].data.labels = labels;
    this.listChart[index].options.legend.display = false;
    this.listChart[index].update();
  }

  createAllGraphs() {
    this.feedbackMetrics.forEach((element, i) => {
      let tempChart;
      if (element.questionType == 'radiobuttons' || element.questionType == 'multiple') {
        tempChart = this.createChart("chart-" + element.questionType + '-' + i, Constants.HorizontalBarChart, horizontalBarChartOptions.options, horizontalBarChartOptions.data);
      }
      if (element.questionType == 'slider') {
        tempChart = this.createChart("chart-" + element.questionType + '-' + i, Constants.LineChart, lineChartOptions.options, lineChartOptions.data);
      }
      if (element.questionType == 'rangeslider2') {
        tempChart = this.createChart("chart-" + element.questionType + '-' + i, Constants.LineChart, twoLineChartOptions.options, twoLineChartOptions.data);
      }
      if (element.questionType == 'rangeslider') {
        tempChart = this.createChart("chart-" + element.questionType + '-' + i, Constants.ScatterChart, scatterPlot.options, scatterPlot.data);
      }
      this.listChart.push(tempChart);
    });
  }


  getColor() {
    return "hsl(" + 360 * Math.random() + ',' +
      (15 + 70 * Math.random()) + '%,' +
      (85 + 10 * Math.random()) + '%)'
  }

  updateAllGraphs() {
    this.feedbackMetrics.forEach((element, i) => {
      let labels = [];
      let dataValues = [];
      let colors = [];
      if (element.questionType == 'radiobuttons' || element.questionType == 'multiple') {
        let maxElementCount = 0;
        element.options.forEach(element2 => {
          if (maxElementCount < element2.optionCount) {
            maxElementCount = element2.optionCount;
          }
        });

        element.options.forEach(element2 => {
          labels.push(element2.optionText);
          dataValues.push(element2.optionCount);
          if (element2.optionCount != maxElementCount) {
            colors.push(this.getColor());
          }
          else {
            colors.push('red');
          }
        });

        this.updateOptions(i, labels, dataValues, colors);
      }

      if (element.questionType == 'slider') {

        let minValue = parseInt(element.originalQuestionOptions.filter(x => x.optionKey == 'min')[0].optionValue);
        let maxValue = parseInt(element.originalQuestionOptions.filter(x => x.optionKey == 'max')[0].optionValue);
        for (let index = minValue; index < maxValue; index++) {
          labels.push(index);
          dataValues.push(0);
        }

        element.options.forEach(element2 => {
          if (element2.optionCount != NaN && element2.optionCount >= minValue && element2.optionCount <= maxValue)
            dataValues[element2.optionCount - minValue] = dataValues[element2.optionCount - minValue] + 1;
        });

        this.updateOptions(i, labels, dataValues, colors);
      }

      if (element.questionType == 'rangeslider2') {

        let dataValues2 = [];
        let minValue = parseInt(element.originalQuestionOptions.filter(x => x.optionKey == 'min')[0].optionValue);
        let maxValue = parseInt(element.originalQuestionOptions.filter(x => x.optionKey == 'max')[0].optionValue);
        for (let index = minValue; index < maxValue; index++) {
          labels.push(index);
          dataValues.push(0);
          dataValues2.push(0);
        }

        element.options.forEach(element2 => {
          if (element2.optionText == 'min' && element2.optionCount != NaN && element2.optionCount >= minValue && element2.optionCount <= maxValue) {
            //dataValues[element2.optionCount - minValue]++;
            dataValues[element2.optionCount - minValue] = dataValues[element2.optionCount - minValue] + 1;
          }
          if (element2.optionText == 'max' && element2.optionCount != NaN && element2.optionCount >= minValue && element2.optionCount <= maxValue) {
            //dataValues2[element2.optionCount - minValue]++;
            dataValues2[element2.optionCount - minValue] = dataValues[element2.optionCount - minValue] + 1;
          }
        });

        this.updateOptions(i, labels, dataValues, colors);
        this.updateOptions(i, labels, dataValues2, colors, 1);
      }

      if (element.questionType == 'rangeslider') {

        let dataValues2 = [];
        let minValue = parseInt(element.originalQuestionOptions.filter(x => x.optionKey == 'min')[0].optionValue);
        let maxValue = parseInt(element.originalQuestionOptions.filter(x => x.optionKey == 'max')[0].optionValue);
        for (let index = minValue; index < maxValue; index++) {
          labels.push(index);
          dataValues.push(0);
          dataValues2.push(0);
        }

        element.options.forEach(element2 => {
          if (element2.optionText == 'min' && element2.optionCount != NaN && element2.optionCount >= minValue && element2.optionCount <= maxValue) {
            //dataValues[element2.optionCount - minValue]++;


            dataValues[element2.optionCount - minValue] = dataValues[element2.optionCount - minValue] + 1;
          }
          if (element2.optionText == 'max' && element2.optionCount != NaN && element2.optionCount >= minValue && element2.optionCount <= maxValue) {
            //dataValues2[element2.optionCount - minValue]++;
            dataValues2[element2.optionCount - minValue] = dataValues[element2.optionCount - minValue] + 1;
          }
        });


        let finalPlot = [];

        let totalValues = 0;
        dataValues.forEach((element, i) => {
          if (element != 0) {
            finalPlot.push({ x: i, y: element });
            colors.push('#EFAA1A');
            if(totalValues < element){
              totalValues = element;
            }
          }
        });

        dataValues2.forEach((element, i) => {
          if (element != 0) {
            finalPlot.push({ x: i, y: element });
            colors.push('#E6302D');
            if(totalValues < element){
              totalValues = element;
            }
          }
        });

        this.updateOptions(i, labels, finalPlot, colors);
      }

    });
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }

  counter(i: number) {
    return new Array(i);
  }

}
