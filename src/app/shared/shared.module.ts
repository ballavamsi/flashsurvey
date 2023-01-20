import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { FileUploadComponent } from '../pages/file-upload/file-upload.component';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatIcon, MatIconModule } from '@angular/material/icon';
// import { FlashSurveyMaterialModules } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
    //FlashSurveyMaterialModules
  ],
  declarations: [
    //FileUploadComponent
  ],
  exports: [
    //FileUploadComponent
  ]
})
export class SharedModule { }
