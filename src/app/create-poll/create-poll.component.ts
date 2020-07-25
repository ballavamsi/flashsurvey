import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { PollService } from '../services/poll/poll.service';
import { PollModel, PollOptionTypes, PollViewModel } from '../models/poll';
import * as moment from 'moment';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { Router } from '@angular/router';
import { OverlayService } from '../overlay/overlay.module';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent {

  newoptionvalue = '';
  minDate = moment().add(1, 'day').toDate();
  maxDate = moment().add(3, 'months').format('L');
  fg: FormGroup;
  newPollViewModel: PollViewModel;


  constructor(public pollService: PollService, public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private _router: Router,
              private _overlayService: OverlayService) {
    const enddate30days = moment().add(30, 'days').toDate();
    this.fg = new FormGroup({
      question: new FormControl('', [Validators.required, Validators.minLength(10)]),
      options: new FormArray([]),
      optionType: new FormControl(PollOptionTypes.radiobutton.toString()),
      duplicateCheck: new FormControl('0'),
      endDate: new FormControl(enddate30days, [Validators.required])
    });
  }


  openDialog(_heading: string, _subheading: string, _message: string, _isLinkShare: boolean) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: _message,
        heading: _heading,
        subheading: _subheading,
        isHtml: _isLinkShare,
        buttonText: {
          cancel: 'Close'
        }
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      const newPollDetails = this.newPollViewModel;
      let sharelink = '';
      if (newPollDetails != null) { sharelink = newPollDetails.pollGuid; }
      this._router.navigate([`poll/view/${sharelink}`]);
    });
  }

  // On Submit
  onSubmit() {
    if (this.fg.valid) {
      if(this.optionsArray.length <= 1)
      {
        this._snackBar.open('Enter atleast two options','Dismiss');
        return;
      }
      this._overlayService.show();
      const data: PollModel = new PollModel();
      data.name = this.getQuestion;
      data.options = this.getOptions;
      data.type = this.getOptionType;
      data.duplicate = this.getDuplicateCheck;
      data.endDate = moment(this.getEndDate).toDate();
      this.pollService.addPoll(data).subscribe(
        result => {
          const returnData: PollViewModel = result;
          this.newPollViewModel = returnData;
          this._overlayService.hide();
          this.openDialog('Poll Created successfully', 'Click on the link to copy', this.generateLink(returnData.pollGuid), true);
        },
        error => {
          this.openDismiss('Failed to create poll, please try again', 'Close');
          this._overlayService.hide();
        });
    } else {
      this.openDismiss('Please fix the error and try again', 'Close');
      this._overlayService.hide();
    }
  }


  /// Get Values
  generateLink(shareId: string): string {
    return window.location.origin + `/poll/view/${shareId}`;
  }

  get getEndDate() {
    return this.fg.get('endDate').value;
  }

  get getOptionType() {
    return this.fg.get('optionType').value;
  }

  get getQuestion() {
    return this.fg.get('question').value;
  }

  get getDuplicateCheck() {
    return this.fg.get('duplicateCheck').value;
  }

  get getOptions() {
    return this.fg.get('options').value;
  }

  get optionsArray(): FormArray {
    return this.fg.get('options') as FormArray;
  }
  ////

  // Add New Option
  addNewOption() {
    const nfg = new FormControl(this.newoptionvalue, [Validators.required, Validators.minLength(2)]);
    this.newoptionvalue = '';
    this.optionsArray.push(nfg);
  }

  // remove item
  removeItem(removeItem: number) {
    this.optionsArray.removeAt(removeItem);
  }

  // drag and drop
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.optionsArray.controls, event.previousIndex, event.currentIndex);
    moveItemInArray(this.optionsArray.value, event.previousIndex, event.currentIndex);
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }
}
