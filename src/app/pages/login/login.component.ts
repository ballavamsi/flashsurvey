import { StorageService } from './../../services/storage/storage.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  //
  public emailId = '';
  public password = '';
  public errorMessage = '';
  public fg: FormGroup;

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private storageService: StorageService) {
    this.fg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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
