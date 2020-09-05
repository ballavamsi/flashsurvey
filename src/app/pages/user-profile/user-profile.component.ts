import { Component, OnInit } from '@angular/core';
import { UserLoginResponse } from 'src/app/models/users';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userDetails: UserLoginResponse;

  constructor(private _storageService: StorageService) {

  }

  ngOnInit() {
    this.userDetails = this._storageService.getUserSessionDetails();
  }

  getUrl() {
    return "url('" + this.userDetails.profileUrl + "')";
  }
}
