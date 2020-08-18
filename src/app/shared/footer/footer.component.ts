import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    test : Date = new Date();

    constructor(private router: Router ) {}

    ngOnInit() {

    }
    getPath(){
      return this.router.url;
    }

    displayFooter(){
      if(this.router.url === "/home" || this.router.url === "/") {
      return true;
      }
      else {
      return false;
      }
    }

    displayFooterThankYou(){
      if(this.router.url === "/home" || this.router.url === "/") {
        return true;
        }
        else {
        return false;
        }
    }
}
