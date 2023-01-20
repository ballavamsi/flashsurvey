import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Constants } from 'src/app/variables/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _storageService: StorageService) { }

  public isAuthenticated(): boolean {
    const token = this._storageService.getSession(Constants.AuthToken);
    // Check whether the token is expired and return
    // true or false
    return token != undefined && token != null && token != "" ? true : false;
  }

}
