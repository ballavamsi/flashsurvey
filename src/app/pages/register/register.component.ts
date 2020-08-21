import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocialAuthService, FacebookLoginProvider,GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(private _socialAuthService: SocialAuthService) {

    this._socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });
   }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }

  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }

  googleRegister(){
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  fbRegister(){
    this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
