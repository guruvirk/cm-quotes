import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from './models';
import { UxService } from './services/ux.service';
import * as moment from 'moment';
import { GoogleTagManagerService } from 'angular-google-tag-manager';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Comfort Movers';
  order: Order = new Order({})
  minDate = new Date()
  isProgress = false

  sizes = ['Single Item', '1 Bedroom', '2 Bedroom', '3 Bedroom', '3+ Bedroom']

  constructor(private uxService: UxService,
    private gtmService: GoogleTagManagerService,
    private http: HttpClient,
    config: NgbCarouselConfig) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit() {
    if (new Date().getHours() > 13) {
      this.minDate = moment().add(1, 'days').toDate()
    }
    this.detectChanges()
  }

  submit() {
    const gtmTag = {
      event: 'submit_click',
      data: this.order
    };
    this.gtmService.pushTag(gtmTag);
    if (!this.order.name) {
      this.uxService.handleError("Please enter Name")
      return
    }
    if (!this.order.email) {
      this.uxService.handleError("Please enter Email")
      return
    }
    if (!this.order.phone) {
      this.uxService.handleError("Please enter Phone")
      return
    }
    if (!this.order.size) {
      this.uxService.handleError("Please select Size of move")
      return
    }
    if (!this.order.date) {
      this.uxService.handleError("Please select Date")
      return
    }
    if (!this.order.where || !this.order.where.special) {
      this.uxService.handleError("Please select Pickup Address")
      return
    }
    if (!this.order.to || !this.order.to.special) {
      this.uxService.handleError("Please select Delivery Address")
      return
    }

    this.isProgress = true
    this.http.post<any>(`${environment.url}`, this.order, { headers: { "x-tenant": "cm" } }).subscribe((responce) => {
      if (responce.isSuccess) {
        const gtmTag = {
          event: 'submitted_successfully',
          data: responce.data
        };
        this.gtmService.pushTag(gtmTag);
        this.uxService.showInfo("Submitted SuccessFully")
        window.localStorage.clear()
        this.order = new Order({})
        window.location.href = `https://comfortmovers.co.nz/success?id=${responce.data.code}`
      } else {
        this.isProgress = false
        this.uxService.showInfo("Unable to Submit " + responce.error)
      }
    }, err => {
      this.isProgress = false
      this.uxService.showInfo("Unable to Submit " + err.message)
    })
  }

  setWhereAddress(address: any) {
    this.order.where = {
      special: address.formatted_address,
      line1: address['street_number'],
      line2: address['route'],
      suburb: address['sublocality'],
      country: address.country,
      state: address['admin_area_l1'],
      city: address.locality,
      pinCode: address['postal_code'],
      district: "",
      floor: "",
      isParkingAway: false,
      isElevator: false,
      vehicleAccess: "",
      accessToHome: ""
    }
    if (this.order.to && this.order.to.special) {
      const gtmTag = {
        event: 'where_to_address_done',
        data: {
          where: this.order.where,
          to: this.order.to
        }
      }
      this.gtmService.pushTag(gtmTag);
    }
    this.saveChanges()
  }

  setToAddress(address: any) {
    this.order.to = {
      special: address.formatted_address,
      line1: address['street_number'],
      line2: address['route'],
      suburb: address['sublocality'],
      country: address.country,
      state: address['admin_area_l1'],
      city: address.locality,
      pinCode: address['postal_code'],
      district: "",
      floor: "",
      isParkingAway: false,
      isElevator: false,
      vehicleAccess: "",
      accessToHome: ""
    }

    if (this.order.where && this.order.where.special) {
      const gtmTag = {
        event: 'where_to_address_done',
        data: {
          where: this.order.where,
          to: this.order.to
        }
      }
      this.gtmService.pushTag(gtmTag);
    }
    this.saveChanges()
  }

  setSize(event: any, size: string) {
    if (event.checked) {
      if (size != 'family-home') {
        this.order.sizeDetails = ""
      }
      this.order.size = size
    } else {
      this.order.size = ""
      this.order.sizeDetails = ""
    }
    this.saveChanges()
  }

  setSizeDetails(event: any, sizeDetails: string) {
    if (event.checked) {
      this.order.sizeDetails = sizeDetails
    } else {
      this.order.sizeDetails = ""
    }
    this.saveChanges()
  }

  setSpeciality(event: any, speciality: string) {
    if (event.checked) {
      this.addSpeciality(speciality)
    } else {
      this.removeSpeciality(speciality)
    }
  }

  doesInclude(speciality: string) {
    return this.order.special && this.order.special.indexOf(speciality) >= 0
  }

  addSpeciality(speciality: string) {
    if (this.order.special && this.order.special.indexOf(speciality) < 0) {
      this.order.special?.push(speciality)
    }
    this.saveChanges()
  }

  removeSpeciality(speciality: string) {
    let index = this.order.special?.indexOf(speciality)
    if (index && index >= 0) {
      this.order.special?.splice(index, 1)
    }
    this.saveChanges()
  }

  saveChanges() {
  }

  detectChanges() {
  }

  moveOnly(input: boolean) {
    this.order.isMoveOnly = input
    this.saveChanges()
  }

  onlyNum(event: any) {
    if (isNaN(event.key)) {
      return false;
    } else {
      return true
    }
  }
}
