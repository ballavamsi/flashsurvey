import { StorageService } from './../../services/storage/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SocialAuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import { UserService } from 'src/app/services/user/user.service';
import { UserSignInModel, SocialPlatform } from 'src/app/models/users';
import { OverlayService } from 'src/app/components/overlay/overlay.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  //
  public errorMessage = '';
  public platform = '';
  public fg: FormGroup;

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private storageService: StorageService,
    private _socialAuthService: SocialAuthService,
    private _userService: UserService,
    private _overlayService: OverlayService) {
    this.fg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });

    this._socialAuthService.authState.subscribe((user) => {

      let loginUser = new UserSignInModel();
      let platformDetails = new SocialPlatform();
      loginUser.name = user.firstName;
      loginUser.email = user.email;

      platformDetails.platform = this.platform;
      platformDetails.platformid = user.id;
      platformDetails.platformImage = user.photoUrl;

      loginUser.platformdetail = platformDetails;
      this._userService.signInUser(loginUser).subscribe((data)=>{
        this.storageService.setSession("UGUID", JSON.stringify(data));
        this._overlayService.hide();
        this.router.navigate(['/dashboard']);
      },
      error=>{
        this._overlayService.hide();
        switch(error.error)
        {
          case 'InactiveUser':
            this.errorMessage = "You are no longer active.";
            break;
          case 'InvalidUser':
            this.errorMessage = "Invalid user detected.";
            break;
          default:
            this.errorMessage = 'Something went wrong';
            break;
        }});
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

  changedData() {
    this.errorMessage = '';
  }

  googleSignIn(){
    this.platform = 'google';
    this._overlayService.show();
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  fbSignIn(){
    this.platform = 'facebook';
    this._overlayService.show();
    this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  onSubmit() {

    if (this.fg.valid) {
      let data = this.fg.value;
      if (data.email.endsWith(".com")) {
        this.storageService.setSession("username",data.email);
        this.router.navigate(['/dashboard']);

      }
      else {
        this.errorMessage = "Incorrect credentails";
      }
    }
  }
}
