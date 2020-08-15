import { Component, OnInit } from '@angular/core';
import lax from 'lax.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {
  private _tiles;

  surveycount = 10;
  pollcount = 10;
  constructor() {
    this._tiles = [
      {cols: 2,rows: 4,color: 'gray'},
      {cols: 2,rows: 4,color: 'white'},
    ];
  }

  ngOnInit() {
  }

}
