import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {

  sharinglink = '';
  resultsLink = '';
  type = '';
  routeGuid = '';
  constructor(private _overlayService: OverlayService, private _snackBar: MatSnackBar, private _activateRoute: ActivatedRoute) {
    this._overlayService.show();
    this._activateRoute.params.subscribe((data) => {
      this.routeGuid = data['id'];
      this.type = data['type'];

      switch (this.type) {
        case 'survey':
          this.sharinglink = this.generateSurveyLink('view',this.routeGuid);
          this.resultsLink = this.generateSurveyLink('results',this.routeGuid);
          break;
        case 'poll':
          this.sharinglink = this.generatePollLink('view',this.routeGuid);
          this.resultsLink = this.generatePollLink('results',this.routeGuid);
          break;
        default:
          this.sharinglink = this.generateSurveyLink('view',this.routeGuid);
          this.resultsLink = this.generateSurveyLink('results',this.routeGuid);
          break;
      }
      this._overlayService.hide();
    });
  }

  ngOnInit() { }

  generatePollLink(linkType:string, shareId: string): string {
    return window.location.origin + `/poll/${linkType}/${shareId}`;
  }

  generateSurveyLink(linkType:string,shareId: string): string {
    return window.location.origin + `/survey/${linkType}/${shareId}`;
  }

  onCopyClick(linkType:string){
    if(linkType === 'view'){
      this.copyToClipboard(this.sharinglink);
    }
    else {
      this.copyToClipboard(this.resultsLink);
    }
  }

  copyToClipboard(data) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = data;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this._snackBar.open('Copied to clipboard', 'Dismiss', {
      duration: 3000,
    });
  }

}
