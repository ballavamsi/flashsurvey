import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NavigationModel } from './models/navigation';
import { MediaMatcher } from '@angular/cdk/layout';
import { NavigationMenuService } from './services/navigation-menu/navigation-menu.service';
import { OverlayService } from './overlay/overlay.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'freepoll-ui';

  fillerNav: NavigationModel[];
  subMenu: NavigationModel[];
  subMenuTitle: string;
  mobileQuery: MediaQueryList;
  public displayProgressSpinner = false;
  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    navigationMenuService: NavigationMenuService,
    overlayService: OverlayService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.fillerNav = navigationMenuService.get();
    this.subMenu = this.fillerNav[0].children;
    overlayService.progressBarVisibility.subscribe((data) => {
      this.displayProgressSpinner = data;
    });

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public showNav = false;
  toogleNav() {
    this.showNav = !this.showNav;
  }

  /* Close when someone clicks on the "x" symbol inside the overlay */
  closeNav() {
    this.showNav = false;
  }

  hoverSubMenu(index) {
    this.subMenu =  this.fillerNav[index].children;
    this.subMenuTitle = this.fillerNav[index].name;
  }
  showSubMenu(index) {
    if (this.fillerNav[index].children.length === 0) {
      this.closeNav();
    }
    else {
      this.subMenu =  this.fillerNav[index].children;
    }
  }
}
