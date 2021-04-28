import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cm-quotes';
  ParkingAwayFrom: boolean
  elevatorAvlFrom: boolean
  ParkingAwayTo: boolean
  elevatorAvlTo: boolean
  isConfirm: boolean
  checked: boolean
  indeterminate: boolean
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  minDate = new Date()

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    if (new Date().getHours() > 13) {
      this.minDate = moment().add(1, 'days').toDate()
    }
  }
}
