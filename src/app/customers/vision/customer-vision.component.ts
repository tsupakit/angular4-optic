import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer, VisionCheck } from '../customer.model';
import { CustomerService } from '../customer.service';
//import { DisableControlDirective } from '../../directives/disable-control.directive';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';

@Component({
  selector: 'customer-vision',
  templateUrl: './customer-vision.component.html',
  styleUrls: ['./customer-vision.component.css']
})
export class CustomerVisionComponent implements OnInit {
  @Input() customer: Customer;

  visionForm: FormGroup;
  isAdding: boolean;
  isEditing: boolean;

  // selected vision object (page)
  vision: VisionCheck = new VisionCheck();
  pageIndex: number = 0;
  totalCheck: number = 0;

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit() {
    
    if (this.customer.visionChecks) {
      this.customer.visionChecks = _.orderBy(this.customer.visionChecks, ['checkedAt'], ['desc']);
      this.vision = this.customer.visionChecks[this.pageIndex];
      this.totalCheck = this.customer.visionChecks.length;
    }

    //console.log(this.vision);
    // enable form if no vision check.
    if (this.totalCheck == 0) {
      this.isEditing = true;
    }

    this.visionForm = this.fb.group(this.populateFormValues(this.vision));
  }

  private populateFormValues(vision: VisionCheck) : any {
    return {
      'VASC_R' : [vision.VASC_R],
      'VASC_L' : [vision.VASC_L],
      'VASC' : [vision.VASC],
      'PinH_R' : [vision.PinH_R],
      'PinH_L' : [vision.PinH_L],
      'PD_Dist_R' : [vision.PD_Dist_R],
      'PD_Dist_L' : [vision.PD_Dist_L],
      'PD_Near_R' : [vision.PD_Near_R],
      'PD_Near_L' : [vision.PD_Near_L]
    }
  }

  addVisionCheck(): void {
    this.isAdding = true;
  }

  cancelEditing(): void {
    //confirm reset if any changes.
    // if (this.visionForm.dirty) {      
    // }

    this.visionForm.reset(this.populateFormValues(this.vision));

    if (this.totalCheck == 0) {
      this.isEditing = false;
    }
  }

  selectVisionPage(index: number): void { 
    this.pageIndex = index;
    this.vision = this.customer.visionChecks[this.pageIndex];
    this.visionForm.setValue(this.populateFormValues(this.vision));
  }

  // save customer root object child vision will automatically saved alongside.
  saveCustomerVision(formValue: any) {

    const vision = this.setVisionValue(formValue);

    // total check is 0 means newly adding
    if (this.totalCheck == 0) {
      vision.checkedAt = firebase.database.ServerValue.TIMESTAMP;
      vision.checkedBy = "developer";

      this.customer.visionChecks = new Array<VisionCheck>();
      this.customer.visionChecks.push(vision);
    } else {
      vision.updatedAt = firebase.database.ServerValue.TIMESTAMP;
      vision.updatedBy = "developer";

      this.customer.visionChecks[this.pageIndex] = vision;
    }

    this.customerService.updateCustomer(this.customer.$key, this.customer);

    this.isEditing = false;
  }


  private setVisionValue(formValue: any): VisionCheck {
    this.vision.VASC_R = formValue.VASC_R;
    this.vision.VASC_L = formValue.VASC_L;
    this.vision.VASC = formValue.VASC;
    this.vision.PinH_R = formValue.PinH_R;
    this.vision.PinH_L = formValue.PinH_L;
    this.vision.PD_Dist_R = formValue.PD_Dist_R;
    this.vision.PD_Dist_L = formValue.PD_Dist_L;
    this.vision.PD_Near_R = formValue.PD_Near_R;
    this.vision.PD_Near_L = formValue.PD_Near_L;

    // get other sight tables.

    return this.vision;
  }

}
