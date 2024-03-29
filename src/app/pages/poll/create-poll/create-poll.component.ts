import { UntypedFormGroup, UntypedFormControl, UntypedFormArray, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { PollOptionTypes, PollViewModel, PollModel } from 'src/app/models/poll';
import { Router } from '@angular/router';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { PollService } from 'src/app/services/poll/poll.service';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { StatusEnum } from 'src/app/variables/status-enum.enum';


@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.component.html',
  styleUrls: ['./create-poll.component.scss']
})
export class CreatePollComponent implements OnInit {

  enddate30days = moment().add(30, 'days').toDate();
  newoptionvalue = '';
  maxDate = moment().add(3, 'months').format('L');
  current = new Date();
  minDate = {
    year: this.current.getFullYear(),
    month: this.current.getMonth() + 1,
    day: this.current.getDate()
  };
  fg: UntypedFormGroup;
  formSubmitted = false;
  newPollViewModel: PollViewModel;

  constructor(public pollService: PollService,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _overlayService: OverlayService) {

    this.fg = new UntypedFormGroup({
      question: new UntypedFormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]),
      options: new UntypedFormArray([]),
      optionType: new UntypedFormControl(PollOptionTypes.radiobutton.toString()),
      duplicateCheck: new UntypedFormControl('0'),
      endDate: new UntypedFormControl(this.enddate30days, [Validators.required])
    });

  }

  ngOnInit() {
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

  get getQuestionControl() {
    return this.fg.get('question');
  }

  get getDuplicateCheck() {
    return this.fg.get('duplicateCheck').value;
  }

  get getOptions() {
    return this.fg.get('options').value;
  }

  get optionsArray(): UntypedFormArray {
    return this.fg.get('options') as UntypedFormArray;
  }
  ////

  // Add New Option
  addNewOption() {
    const nfg = new UntypedFormControl(this.newoptionvalue, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
    this.newoptionvalue = '';
    this.optionsArray.push(nfg);
  }

  // remove item
  removeItem(removeItem: number) {
    this.optionsArray.removeAt(removeItem);
  }

  //options error messages


  // On Submit
  onSubmit() {
    this.formSubmitted = true;
    this._overlayService.show();

    if (this.fg.valid) {
      if (this.optionsArray.length <= 1) {
        this._overlayService.hide();
        this.formSubmitted = false;
        this._snackBar.open('Enter atleast two options', 'Dismiss');
        return;
      }
      this._overlayService.show();
      const data: PollModel = new PollModel();
      data.name = this.getQuestion;
      data.options = this.getOptions;
      data.type = this.getOptionType;
      data.duplicate = this.getDuplicateCheck;
      data.endDate = moment(this.getEndDate).toDate();
      data.status = StatusEnum.Published;
      this.pollService.addPoll(data).subscribe(
        result => {
          const returnData: PollViewModel = result;
          this.newPollViewModel = returnData;
          this._overlayService.hide();
          this._router.navigate([`success/poll/${returnData.pollGuid}`]);
        },
        error => {
          this.openDismiss('Failed to create poll, please try again', 'Close');
          this._overlayService.hide();
          this.formSubmitted = false;
        });
    } else {
      this.openDismiss('Please fix the error and try again', 'Close');
      this.formSubmitted = false;
      this._overlayService.hide();
    }
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
    });
  }
}



