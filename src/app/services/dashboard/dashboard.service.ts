import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _api: ApiService) { }

  getDashboardTiles() {
    return this._api.getDashboardTiles();
  }

}
