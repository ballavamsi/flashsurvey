import { Component, OnInit, OnDestroy } from '@angular/core';
import { PollOptionVote, PollVote, PollViewModel } from 'src/app/models/poll';
import { FormControl, FormArray, FormGroup } from '@angular/forms';
import { OverlayService } from 'src/app/components/overlay/overlay.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { PollService } from 'src/app/services/poll/poll.service';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.component.html',
  styleUrls: ['./view-poll.component.scss']
})
export class ViewPollComponent implements OnInit, OnDestroy {

  routeGuid: string;
  public pollData = new PollViewModel();
  public pollExists = true;
  public loaded = false;
  public errorMessage = '';

  fg: FormGroup;
  selected = Array(0);

  constructor(private _pollService: PollService,
              private _activateRoute: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private _router: Router,
              private _overlayService: OverlayService) {

    this.emptyFormGroup();
    this._overlayService.show();
    this._activateRoute.params.subscribe((data) => {
      this.routeGuid = data['id'];

      /// Get Poll Details
      this._pollService.getPoll(this.routeGuid).subscribe(
        (data: PollViewModel) => {
          this.loaded = true;
          this.pollData = data;
          this.fillFormGroup(data);
          this.pollExists = true;
          this._overlayService.hide();
        },
        error => {
          this.loaded = true;
          this._overlayService.hide();
          switch(error.error)
          {
            case 'PollNotFound':
              this.errorMessage = 'Oops the poll you are looking for is not there....';
              break;
            case 'PollEnded':
              this.errorMessage = 'The Poll you are looking for ended';
              break;
            default:
              this.errorMessage = 'Something went wrong, Please try after sometime.';
              break;
          }
        });
    });
  }

  emptyFormGroup() {
    let tempP = new PollVote();
    tempP.pollId = 0;
    tempP.options = [];
    this.initFormGroup(tempP);
  }


  fillFormGroup(data: PollViewModel)
  {
    let p = new PollVote();
    p.pollId = data.pollId;
    p.options = [];

    data.pollOptions.forEach((element) => {
      let po = new PollOptionVote();
      po.optionId = element.pollOptionId;
      po.optionText = element.optionText;
      po.isChecked = false;
      p.options.push(po);
    });
    this.initFormGroup(p);
  }

  initFormGroup(data: PollVote) {
    this.fg = new FormGroup({
      pollid: new FormControl(data.pollId),
      options: new FormArray([])
    });

    data.options.forEach(element => {
      this.addNewOption(element);
    });
  }

  // events
  onCheckChange(event) {
    if (event.target.checked) {
      if (this.pollData.type == 0) {
        this.selected.pop();
      }
      this.selected.push(event.target.value);
    }
    else {
      const index = this.selected.indexOf(event.target.value);
      this.selected.splice(index, 1);
    }
  }

  onSubmit() {
    if(this.selected.length > 0)
    {
      this._overlayService.show();
      let votePollDetails = new PollVote();
      votePollDetails.pollId = this.pollData.pollId;
      votePollDetails.options = this.selected;
      this._pollService.vote(votePollDetails).subscribe((data: boolean)=>{
        if(data) {
          this._overlayService.hide();
          this.openDismiss('You have voted','Dismiss');
          this._router.navigate([`poll/result/${this.routeGuid}`]);
        }
      },
      error=>{
        this._overlayService.hide();
        switch(error.error)
        {
          case 'PollNotFound':
            this.openDismiss('Invalid Poll','Dismiss');
            break;
          case 'PollEnded':
            this.openDismiss('The Poll you are looking for ended','Dismiss');
            break;
          case 'PollVoted':
            this.openDismiss('No cheating you already voted','Dismiss');
            break;
          default:
            this.openDismiss('Something went wrong','Dismiss');
            break;
        }
        this.fg.disable();
      })
    }
    else
    {
      this.openDismiss("Select atleast one option","Dismiss");
    }
  }

  // add new option
  addNewOption(newoptionvalue: PollOptionVote) {
    const nfg = new FormControl(newoptionvalue);
    this.options.push(nfg);
  }

  // get data
  get options(): FormArray {
    return this.fg.get('options') as FormArray;
  }

  // open snackbar
  openDismiss(message: string, buttontext: string) {
    this._snackBar.open(message, buttontext, {
      duration: 3000,
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
}
