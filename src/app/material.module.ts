import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  exports: [
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class FlashSurveyMaterialModules {}