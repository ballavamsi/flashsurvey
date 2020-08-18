import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { AuthService } from './services/api/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HomeModule } from './pages/home/home.module';
import { LoginComponent } from './pages/login/login.component';

import { StarRatingComponent } from './shared/star-rating/star-rating.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { GoogleChartsModule } from 'angular-google-charts';

import { StatusService } from './services/status/status.service';
import { NavigationMenuService } from './services/navigation-menu/navigation-menu.service';
import { ApiService } from './services/api/api.service';
import { FreePollMaterialModules } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';

import { ProgressSpinnerComponent } from './shared/progress-spinner/progress-spinner.component';
import { OverlayService } from './shared/overlay/overlay.module';
import { ProgressSpinnerModule } from './shared/progress-spinner/progress-spinner.module';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { NouisliderModule } from 'ng2-nouislider';
import { AboutUsComponent } from './pages/about-us/about-us.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';


const provide = [
  AuthService,
  AuthGuardService,
  StatusService,
  NavigationMenuService,
  ApiService,
  OverlayService,
  { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }];

@NgModule({
  declarations: [
    ProgressSpinnerComponent,
    AppComponent,
    SignupComponent,
    LandingComponent,
    NavbarComponent,
    AboutUsComponent,
    FooterComponent,
    LoginComponent,
    SidebarComponent,
    AlertDialogComponent,
    AdminLayoutComponent, 

  ],
  entryComponents: [
    ProgressSpinnerComponent,
    AppComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    HomeModule,
    CommonModule,
    NouisliderModule,
    MatProgressSpinnerModule,
    ProgressSpinnerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GoogleChartsModule,
    FreePollMaterialModules
  ],
  providers: [provide],
  bootstrap: [AppComponent]
})
export class AppModule { }
