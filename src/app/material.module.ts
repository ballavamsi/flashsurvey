import {NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular/material/legacy-progress-bar';
import {MatLegacySnackBarModule as MatSnackBarModule} from '@angular/material/legacy-snack-bar';

@NgModule({
  exports: [
    MatProgressBarModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class FlashSurveyMaterialModules {}