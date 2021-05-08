import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';

@Component({
  selector: 'google-address',
  templateUrl: './google-address.component.html',
  styleUrls: ['./google-address.component.css']
})
export class GoogleAddressComponent implements OnInit {

  @Output()
  fullAddress: EventEmitter<any> = new EventEmitter()

  @Input()
  label: string;

  @Input()
  line1: string;

  constructor(
    private zone: NgZone,
  ) { }

  ngOnInit() {
  }

  setAddress(address) {
    this.zone.run(() => {
      this.fullAddress.emit(address);
    });
  }

}
