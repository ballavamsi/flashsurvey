import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  SocialAuthService,
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialUser,
} from "@abacritt/angularx-social-login";
import {
  UntypedFormGroup,
  UntypedFormControl,
  Validators,
} from "@angular/forms";
import { StorageService } from "src/app/services/storage/storage.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UserSignInModel } from "src/app/models/users";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit, OnDestroy {
  //
  public errorMessage = "";
  public fg: UntypedFormGroup;
  public socialSite = "";

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private storageService: StorageService,
    private _socialAuthService: SocialAuthService
  ) {
    this.fg = new UntypedFormGroup({
      username: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
      email: new UntypedFormControl("", [
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(3),
      ]),
    });

    this._socialAuthService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  changedData() {
    this.errorMessage = "";
  }

  onSubmit() {
    if (this.fg.valid) {
      //let data = this.modifyData(this.fg.value);
      // if (data..endsWith(".com")) {
      //   this.storageService.setSession("username",data.email);
      //   this.router.navigate(['/dashboard']);
      // }
      // else {
      //   this.errorMessage = "Incorrect credentails";
      // }
    }
  }

  // modifyData(data): any {
  //   let returnData = new UserSignInModel();
  //   returnData.userName = data.name;
  //   returnData.password = data.password;
  //   returnData.userEmail = data.email;
  //   return returnData;
  // }

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }

  ngOnDestroy(): void {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }

  googleRegister() {
    this.socialSite = "google";
    this._socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  fbRegister() {
    this.socialSite = "facebook";
    this._socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
