import { Component, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouComponent implements OnInit {

  sharinglink = '';
  type = '';
  routeGuid = '';
  constructor(private _overlayService: OverlayService, private _snackBar: MatSnackBar, private _activateRoute: ActivatedRoute) {
    this._overlayService.show();
    this._activateRoute.params.subscribe((data) => {
      this.routeGuid = data['id'];
      this.type = data['type'];

      switch (this.type) {
        case 'survey':
          this.sharinglink = this.generateSurveyLink(this.routeGuid);
          break;
        case 'poll':
          this.sharinglink = this.generatePollLink(this.routeGuid);
          break;
        default:
          this.sharinglink = this.generateSurveyLink(this.routeGuid);
          break;
      }
      this._overlayService.hide();
    });
  }

  ngOnInit() { }

  generatePollLink(shareId: string): string {
    return window.location.origin + `/poll/results/${shareId}`;
  }

  generateSurveyLink(shareId: string): string {
    return window.location.origin + `/survey/results/${shareId}`;
  }

  onCopyClick() {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.sharinglink;
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
