import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(socialAuthService: SocialAuthService) {
      socialAuthService.signOut();
  }

  ngOnInit() {
  }

}
