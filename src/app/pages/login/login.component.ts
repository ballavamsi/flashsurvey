import { StorageService } from './../../services/storage/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import {
  SocialAuthService,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { UserService } from 'src/app/services/user/user.service';
import { UserSignInModel, SocialPlatform } from 'src/app/models/users';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { Constants } from 'src/app/variables/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  //
  public errorMessage = '';
  public platform = '';
  public fg: UntypedFormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private storageService: StorageService,
    private _socialAuthService: SocialAuthService,
    private _userService: UserService,
    private _overlayService: OverlayService
  ) {
    this.fg = new UntypedFormGroup({
      email: new UntypedFormControl('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new UntypedFormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

    this._overlayService.show();
    this._socialAuthService.initState.subscribe(
      () => {},
      console.error,
      () => {
        console.log('all providers are ready');
        this._overlayService.hide();
      }
    );

    this._socialAuthService.authState.subscribe((user) => {
      this._overlayService.show();
      let loginUser = new UserSignInModel();
      let platformDetails = new SocialPlatform();
      loginUser.name = user.firstName;
      loginUser.email = user.email;

      platformDetails.platform = 'google';
      platformDetails.platformid = user.id;
      platformDetails.platformImage = user.photoUrl;

      loginUser.platformdetail = platformDetails;
      this._userService.signInUser(loginUser).subscribe(
        (data) => {
          this.storageService.setSession(
            Constants.SessionKey,
            JSON.stringify(data)
          );
          this.storageService.setSession(Constants.AuthToken, user.authToken);
          this._overlayService.hide();
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          this._overlayService.hide();
          switch (error.error) {
            case 'InactiveUser':
              this.errorMessage = 'You are no longer active.';
              break;
            case 'InvalidUser':
              this.errorMessage = 'Invalid user detected.';
              break;
            default:
              this.errorMessage =
                'Our API seems to be down, we are out of free hits for this period, give us sometime to get back.';
              break;
          }
        }
      );
    });
  }

  ngOnInit() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-default');
  }
  ngOnDestroy(): void {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('bg-default');
  }

  changedData() {
    this.errorMessage = '';
  }

  fsGoogleAutoLogin(e: any) {
    console.log('fsGoogleAutoLogin', e);
    // this._overlayService.show();
    // this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  googleSignIn() {
    this.platform = 'google';
    this._overlayService.show();
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  fbSignIn() {
    this.platform = 'facebook';
    this._overlayService.show();
    this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  onSubmit() {
    if (this.fg.valid) {
      let data = this.fg.value;
      if (data.email.endsWith('.com')) {
        this.storageService.setSession('username', data.email);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Incorrect credentails';
      }
    }
  }
}
