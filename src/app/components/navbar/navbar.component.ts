import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UserLoginResponse } from 'src/app/models/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  firstname = '';
  profileUrl = '';

  constructor(location: Location,  private element: ElementRef, private router: Router, private _storageService: StorageService) {
    this.location = location;
  }

  ngOnInit() {
    let userDetails: UserLoginResponse = JSON.parse(this._storageService.getSession("UGUID"));
    this.firstname = userDetails.userName;
    this.profileUrl = userDetails.profileUrl;
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
