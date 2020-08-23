import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { DashboardMetricTile } from 'src/app/models/dashboard';
import { OverlayService } from 'src/app/components/overlay/overlay.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  loaded = false;

  metricTile: DashboardMetricTile;
  constructor(private _dashboardService: DashboardService,
    private _overlayService: OverlayService) {
      this._overlayService.show();
    this._dashboardService.getDashboardTiles().subscribe((data: DashboardMetricTile) =>{
      this.metricTile = data;
      this.loaded= true;
      this._overlayService.hide();
    },
    error=>{
      this.loaded= true;
      this.metricTile.polls = 0;
      this.metricTile.pollVotes = 0;
      this.metricTile.surveys = 0;
      this.metricTile.surveyFeedbacks = 0;
      this._overlayService.hide();
    });
   }

  ngOnInit() {

    // this.datasets = [
    //   [0, 20, 10, 30, 15, 40, 20, 60, 60],
    //   [0, 20, 5, 25, 10, 30, 15, 40, 40]
    // ];
    // this.data = this.datasets[0];


    // var chartOrders = document.getElementById('chart-orders');

    // parseOptions(Chart, chartOptions());


    // var ordersChart = new Chart(chartOrders, {
    //   type: 'bar',
    //   options: chartExample2.options,
    //   data: chartExample2.data
    // });

    // var chartSales = document.getElementById('chart-sales');

    // this.salesChart = new Chart(chartSales, {
		// 	type: 'line',
		// 	options: chartExample1.options,
		// 	data: chartExample1.data
		// });
  }





  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

}
