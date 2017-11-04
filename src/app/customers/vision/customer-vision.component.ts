import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Customer, VisionCheck } from '../customer.model';
import { CustomerService } from '../customer.service';
import * as _ from 'lodash';

@Component({
  selector: 'customer-vision',
  templateUrl: './customer-vision.component.html',
  styleUrls: ['./customer-vision.component.css']
})
export class CustomerVisionComponent implements OnInit {
  @Input() customer: Customer;

  visionForm: FormGroup;
  vision: VisionCheck = new VisionCheck();; //selected vision page
  pageIndex: number = 0;

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit() {
    // console.log(this.customer.visionChecks);

    if (this.customer.visionChecks) {
      this.customer.visionChecks = _.orderBy(this.customer.visionChecks, ['checkedAt'], ['desc']);
      this.vision = this.customer.visionChecks[this.pageIndex];
    }

    this.visionForm = this.fb.group({
      'VASC_R' : [this.vision.VASC_R],
      'VASC_L' : [this.vision.VASC_L],
      'VASC' : [this.vision.VASC],
      'PinH_R' : [this.vision.PinH_R],
      'PinH_L' : [this.vision.PinH_L],
      'PD_Dist_R' : [this.vision.PD_Dist_R],
      'PD_Dist_L' : [this.vision.PD_Dist_L],
      'PD_Near_R' : [this.vision.PD_Near_R],
      'PD_Near_L' : [this.vision.PD_Near_L]
    });
  }

  selectVisionPage(index: number): void { 
    this.pageIndex = index;
    this.vision = this.customer.visionChecks[this.pageIndex];

    this.visionForm.setValue({
      'VASC_R' : [this.vision.VASC_R],
      'VASC_L' : [this.vision.VASC_L],
      'VASC' : [this.vision.VASC],
      'PinH_R' : [this.vision.PinH_R],
      'PinH_L' : [this.vision.PinH_L],
      'PD_Dist_R' : [this.vision.PD_Dist_R],
      'PD_Dist_L' : [this.vision.PD_Dist_L],
      'PD_Near_R' : [this.vision.PD_Near_R],
      'PD_Near_L' : [this.vision.PD_Near_L]
    });
  }

  saveCustomerVision(formValue: any) {
  }

}
