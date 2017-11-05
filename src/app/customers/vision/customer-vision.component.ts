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

    if (!vision.oldGlassesSight) {
      VisionCheck.initOldGlassesSight(vision);
    }

    if (!vision.eyeSight) {
      VisionCheck.initEyeSight(vision);
    }

    return {
      'VASC_R' : [vision.VASC_R],
      'VASC_L' : [vision.VASC_L],
      'VASC' : [vision.VASC],
      'PinH_R' : [vision.PinH_R],
      'PinH_L' : [vision.PinH_L],
      'PD_Dist_R' : [vision.PD_Dist_R],
      'PD_Dist_L' : [vision.PD_Dist_L],
      'PD_Near_R' : [vision.PD_Near_R],
      'PD_Near_L' : [vision.PD_Near_L], 

      // old glasses
      'SPH_R' : [vision.oldGlassesSight.SPH_R],
      'SPH_L' : [vision.oldGlassesSight.SPH_L],
      'CYL_R' : [vision.oldGlassesSight.CYL_R],
      'CYL_L' : [vision.oldGlassesSight.CYL_L],
      'Ax_R' : [vision.oldGlassesSight.Ax_R],
      'Ax_L' : [vision.oldGlassesSight.Ax_L],
      'OG_PD_Dist_R' : [vision.oldGlassesSight.PD_Dist_R],
      'OG_PD_Dist_L' : [vision.oldGlassesSight.PD_Dist_L],
      'OG_PD_Near_R' : [vision.oldGlassesSight.PD_Near_R],
      'OG_PD_Near_L' : [vision.oldGlassesSight.PD_Near_L],
      'PH_R' : [vision.oldGlassesSight.PH_R],
      'PH_L' : [vision.oldGlassesSight.PH_L],
      'VA_R' : [vision.oldGlassesSight.VA_R],
      'VA_L' : [vision.oldGlassesSight.VA_L],
      'VA' : [vision.oldGlassesSight.VA],

      // eye sight
      'ES_SPH_R' : [vision.eyeSight.SPH_R],
      'ES_SPH_L' : [vision.eyeSight.SPH_L],
      'ES_CYL_R' : [vision.eyeSight.CYL_R],
      'ES_CYL_L' : [vision.eyeSight.CYL_L],
      'ES_Ax_R' : [vision.eyeSight.Ax_R],
      'ES_Ax_L' : [vision.eyeSight.Ax_L],

      'ES_VA_Dist_R' : [vision.eyeSight.VA_Dist_R],
      'ES_VA_Dist_L' : [vision.eyeSight.VA_Dist_L],
      'ES_VA_Dist' : [vision.eyeSight.VA_Dist],

      'ES_ADD_R' : [vision.eyeSight.ADD_R],
      'ES_ADD_L' : [vision.eyeSight.ADD_L],

      'ES_VA_Near' : [vision.eyeSight.VA_Near],

      'ES_Prism_R' : [vision.eyeSight.Prism_R],
      'ES_Prism_L' : [vision.eyeSight.Prism_L],

      'ES_Remark' : [vision.eyeSight.remark],
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

    console.log(vision.checkedAt);
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

    // old glasses sight.
    this.vision.oldGlassesSight.SPH_R = formValue.SPH_R;
    this.vision.oldGlassesSight.SPH_L = formValue.SPH_L;
    this.vision.oldGlassesSight.CYL_R = formValue.CYL_R;
    this.vision.oldGlassesSight.CYL_L = formValue.CYL_L;
    this.vision.oldGlassesSight.Ax_R = formValue.Ax_R;
    this.vision.oldGlassesSight.Ax_L = formValue.Ax_L;
    this.vision.oldGlassesSight.PD_Dist_R = formValue.OG_PD_Dist_R;
    this.vision.oldGlassesSight.PD_Dist_L = formValue.OG_PD_Dist_L;
    this.vision.oldGlassesSight.PD_Near_R = formValue.OG_PD_Near_R;
    this.vision.oldGlassesSight.PD_Near_L = formValue.OG_PD_Near_L;
    this.vision.oldGlassesSight.PH_R = formValue.PH_R;
    this.vision.oldGlassesSight.PH_L = formValue.PH_L;
    this.vision.oldGlassesSight.VA_R = formValue.VA_R;
    this.vision.oldGlassesSight.VA_L = formValue.VA_L;
    this.vision.oldGlassesSight.VA = formValue.VA;

    // eye sight
    this.vision.eyeSight.SPH_R = formValue.ES_SPH_R;
    this.vision.eyeSight.SPH_L = formValue.ES_SPH_L;
    this.vision.eyeSight.CYL_R = formValue.ES_CYL_R;
    this.vision.eyeSight.CYL_L = formValue.ES_CYL_L;
    this.vision.eyeSight.Ax_R = formValue.ES_Ax_R;
    this.vision.eyeSight.Ax_L = formValue.ES_Ax_L;
    this.vision.eyeSight.VA_Dist_R = formValue.ES_VA_Dist_R;
    this.vision.eyeSight.VA_Dist_L = formValue.ES_VA_Dist_L;
    this.vision.eyeSight.VA_Dist = formValue.ES_VA_Dist;
    this.vision.eyeSight.ADD_R = formValue.ES_ADD_R;
    this.vision.eyeSight.ADD_L = formValue.ES_ADD_L;
    this.vision.eyeSight.VA_Near = formValue.ES_VA_Near;
    this.vision.eyeSight.Prism_R = formValue.ES_Prism_R;
    this.vision.eyeSight.Prism_L = formValue.ES_Prism_L;
    this.vision.eyeSight.remark = formValue.ES_Remark;

    return this.vision;
  }

}

