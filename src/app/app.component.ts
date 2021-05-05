import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material';
import * as moment from 'moment';
import { Order } from './models';
import { UxService } from './services/ux.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  title = 'Comfort Movers';
  order: Order = new Order({})
  isTNC: boolean = false
  isConfirm: boolean = false
  minDate = new Date()
  isProgress = false

  @ViewChild('stepper', null) private myStepper: MatStepper;

  step = 0
  floors: {
    name: string
    value: string
  }[] = [
      {
        name: "ground",
        value: "Ground Floor"
      },
      {
        name: "1st",
        value: "1st Floor"
      },
      {
        name: "2nd",
        value: "2nd Floor"
      },
      {
        name: "3rd",
        value: "3rd Floor"
      },
      {
        name: "4th",
        value: "4th Floor"
      },
      {
        name: "5th",
        value: "5th Floor"
      },
      {
        name: "6th",
        value: "6th Floor"
      },
      {
        name: "7th",
        value: "7th Floor"
      },
      {
        name: "8th",
        value: "8th Floor"
      },
      {
        name: "9th",
        value: "9th Floor"
      },
      {
        name: "10th",
        value: "10th Floor"
      },
      {
        name: "11th",
        value: "11th Floor"
      },
      {
        name: "12th",
        value: "12th Floor"
      },
      {
        name: "13th",
        value: "13th Floor"
      },
      {
        name: "14th",
        value: "14th Floor"
      },
      {
        name: "15th",
        value: "15th Floor"
      },
      {
        name: "16th",
        value: "16th Floor"
      },
      {
        name: "17th",
        value: "17th Floor"
      },
      {
        name: "18th",
        value: "18th Floor"
      },
      {
        name: "19th",
        value: "18th Floor"
      },
      {
        name: "19th",
        value: "18th Floor"
      },
      {
        name: "20th",
        value: "20th Floor"
      },
      {
        name: "21th",
        value: "21th Floor"
      },
      {
        name: "22th",
        value: "22th Floor"
      }, {
        name: "23th",
        value: "23th Floor"
      },
      {
        name: "24th",
        value: "24th Floor"
      }, {
        name: "25th",
        value: "25th Floor"
      }, {
        name: "26th",
        value: "26th Floor"
      },
      {
        name: "27th",
        value: "27th Floor"
      },
      {
        name: "28th",
        value: "28th Floor"
      },
      {
        name: "29th",
        value: "29th Floor"
      },
      {
        name: "30th",
        value: "30th Floor"
      }
    ]

  constructor(private uxService: UxService) { }

  ngOnInit() {
    if (new Date().getHours() > 13) {
      this.minDate = moment().add(1, 'days').toDate()
    }
    this.detectChanges()
  }

  firstNext(stepper: MatStepper) {
    if (!this.order.where.city || !this.order.where.state || !this.order.where.country || !this.order.where.pinCode) {
      this.uxService.handleError("Please select correct Where From address")
      return
    }
    if (!this.order.to.city || !this.order.to.state || !this.order.to.country || !this.order.to.pinCode) {
      this.uxService.handleError("Please select correct Where to address")
      return
    }
    if (!this.order.where.floor) {
      this.uxService.handleError("Please select correct Where from floor")
      return
    }
    if (!this.order.to.floor) {
      this.uxService.handleError("Please select correct Where to floor")
      return
    }
    if (!this.order.date) {
      this.uxService.handleError("Please select correct Pick Up Date")
      return
    }
    if (!this.order.timeslot) {
      this.uxService.handleError("Please select correct Pick Up Time")
      return
    }
    if (!this.isConfirm) {
      this.uxService.handleError("Please confirm above information")
      return
    }
    stepper.next();
    this.step = 1
    this.saveChanges()
  }

  thirdNext(stepper: MatStepper) {
    if (!this.order.email) {
      this.uxService.handleError("Please enter Billing email")
      return
    }
    if (!this.order.phone) {
      this.uxService.handleError("Please enter Billing phone")
      return
    }
    if (!this.order.where.name) {
      this.uxService.handleError("Please enter Pick-up Contact Details Full Name")
      return
    }
    if (!this.order.where.phone) {
      this.uxService.handleError("Please enter Pick-up Contact Details Contact number")
      return
    }
    if (!this.order.to.name) {
      this.uxService.handleError("Please enter Delivery Contact Details Full Name")
      return
    }
    if (!this.order.to.phone) {
      this.uxService.handleError("Please enter Delivery Contact Details Contact number")
      return
    }
    if (!this.isTNC) {
      this.uxService.handleError("Please accept Terms and Conditions")
      return
    }
    this.uxService.showInfo("Submitted SuccessFully")
    this.isProgress = true
    window.localStorage.clear()
    this.order = new Order({})
    this.isConfirm = false
    this.isTNC = false
    this.myStepper.selectedIndex = 0
    window.location.href = "https://comfortmovers.co.nz/#hero"
  }

  secondBack(stepper: MatStepper) {
    stepper.previous();
    this.step = 0
    this.saveChanges()
  }

  thirdBack(stepper: MatStepper) {
    stepper.previous();
    this.step = 1
    this.saveChanges()
  }

  copypickUp() {
    this.order.to.name = this.order.where.name
    this.order.to.phone = this.order.where.phone
    this.saveChanges()
  }

  secondNext(stepper: MatStepper) {
    if (!this.order.size) {
      this.uxService.handleError("Please select Size of move")
      return
    }
    if (this.order.size == 'family-home' && !this.order.sizeDetails) {
      this.uxService.handleError("Please select Bedroom Details")
      return
    }
    if (!this.order.where.vehicleAccess) {
      this.uxService.handleError("Please select Pick up Vehicle access")
      return
    }
    if (!this.order.where.accessToHome) {
      this.uxService.handleError("Please select Pick up Access into home")
      return
    }
    if (!this.order.to.vehicleAccess) {
      this.uxService.handleError("Please select Delivery address Vehicle access")
      return
    }
    if (!this.order.to.accessToHome) {
      this.uxService.handleError("Please select Delivery address Access into home")
      return
    }
    stepper.next();
    this.step = 2
    this.saveChanges()
  }

  setWhereAddress(address) {
    this.order.where.line1 = address.formatted_address;
    this.order.where.line2 = address['street_number'] + " " + address['route'];
    this.order.where.country = address.country;
    this.order.where.state = address['admin_area_l1'];
    this.order.where.city = address.locality;
    this.order.where.pinCode = address['postal_code'];
    this.saveChanges()
  }

  setToAddress(address) {
    this.order.to.line1 = address.formatted_address;
    this.order.to.line2 = address['street_number'] + " " + address['route'];
    this.order.to.country = address.country;
    this.order.to.state = address['admin_area_l1'];
    this.order.to.city = address.locality;
    this.order.to.pinCode = address['postal_code'];
    this.saveChanges()
  }

  setSize(event, size: string) {
    if (event.checked) {
      if (size != 'family-home') {
        this.order.sizeDetails = null
      }
      this.order.size = size
    } else {
      this.order.size = null
      this.order.sizeDetails = null
    }
    this.saveChanges()
  }

  setSizeDetails(event, sizeDetails: string) {
    if (event.checked) {
      this.order.sizeDetails = sizeDetails
    } else {
      this.order.sizeDetails = null
    }
    this.saveChanges()
  }

  setSpeciality(event, speciality: string) {
    if (event.checked) {
      this.addSpeciality(speciality)
    } else {
      this.removeSpeciality(speciality)
    }
  }

  doesInclude(speciality: string) {
    return this.order.special.indexOf(speciality) >= 0
  }

  addSpeciality(speciality: string) {
    if (this.order.special.indexOf(speciality) < 0) {
      this.order.special.push(speciality)
    }
    this.saveChanges()
  }

  removeSpeciality(speciality: string) {
    let index = this.order.special.indexOf(speciality)
    if (index >= 0) {
      this.order.special.splice(index, 1)
    }
    this.saveChanges()
  }

  saveChanges() {
    window.localStorage.setItem('order', JSON.stringify(this.order))
    window.localStorage.setItem('step', this.step.toString())
  }

  detectChanges() {
    let order = JSON.parse(window.localStorage.getItem('order'))
    if (order) {
      this.order = new Order(order)
    }
    let step = window.localStorage.getItem('step')
    if (Number(step) >= 0) {
      if (Number(step) > 0) {
        this.isConfirm = true
      }
      this.step = Number(step)
      this.myStepper.selectedIndex = Number(step)
    }
  }

  moveOnly(input: boolean) {
    this.order.isMoveOnly = input
    this.saveChanges()
  }

  paymentChange(input: boolean) {
    this.order.paymentAtDelivery = input
    this.saveChanges()
  }

  openTNC() {
    this.uxService.showInfo("TNC")
  }

  onlyNum(event) {
    if (isNaN(event.key)) {
      return false;
    }
  }

}
