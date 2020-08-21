import { Component } from '@angular/core';
import { OverlayService } from './components/overlay/overlay.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'flashsurvey';
  public displayProgressSpinner = false;
  constructor(overlayService: OverlayService) {
    overlayService.progressBarVisibility.subscribe((data) => {
      this.displayProgressSpinner = data;
    });

  }

}
