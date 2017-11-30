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
  //totalCheck: number = 0;

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit() {

    if (this.customer.visionChecks) {
      this.customer.visionChecks = _.orderBy(this.customer.visionChecks, ['checkedAt'], ['desc']);
      this.vision = this.customer.visionChecks[this.pageIndex];
      //this.totalCheck = this.customer.visionChecks.length;
    }
    //console.log(this.vision);
    // enable form if no vision check.
    //if (this.customer.visionChecks.length === 0) {
    else {
      this.isEditing = true;
    }

    this.visionForm = this.fb.group(this.populateFormValues(this.vision));
  }

  private populateFormValues(vision: VisionCheck): any {

    if (!vision.oldGlassesSight) {
      VisionCheck.initOldGlassesSight(vision);
    }

    if (!vision.eyeSight) {
      VisionCheck.initEyeSight(vision);
    }

    if (!vision.newGlassesSight) {
      VisionCheck.initNewGlassesSight(vision);
    }

    if (!vision.contactLensSight) {
      VisionCheck.initContactLensSight(vision);
    }

    // undefined checking using || for prevent error from unsaved properties when reset the form.
    return {
      'VASC_R' : [vision.VASC_R || ''],
      'VASC_L' : [vision.VASC_L || ''],
      'VASC' : [vision.VASC || ''],
      'PinH_R' : [vision.PinH_R || ''],
      'PinH_L' : [vision.PinH_L || ''],
      'PD_Dist_R' : [vision.PD_Dist_R || ''],
      'PD_Dist_L' : [vision.PD_Dist_L || ''],
      'PD_Near_R' : [vision.PD_Near_R || ''],
      'PD_Near_L' : [vision.PD_Near_L || ''],

      // Old Glasses
      'OG_SPH_R' : [vision.oldGlassesSight.SPH_R || ''],
      'OG_SPH_L' : [vision.oldGlassesSight.SPH_L || ''],
      'OG_CYL_R' : [vision.oldGlassesSight.CYL_R || ''],
      'OG_CYL_L' : [vision.oldGlassesSight.CYL_L || ''],
      'OG_Ax_R' : [vision.oldGlassesSight.Ax_R || ''],
      'OG_Ax_L' : [vision.oldGlassesSight.Ax_L || ''],
      'OG_PD_Dist_R' : [vision.oldGlassesSight.PD_Dist_R || ''],
      'OG_PD_Dist_L' : [vision.oldGlassesSight.PD_Dist_L || ''],
      'OG_PD_Near_R' : [vision.oldGlassesSight.PD_Near_R || ''],
      'OG_PD_Near_L' : [vision.oldGlassesSight.PD_Near_L || ''],
      'OG_PH_R' : [vision.oldGlassesSight.PH_R || ''],
      'OG_PH_L' : [vision.oldGlassesSight.PH_L || ''],
      'OG_VA_R' : [vision.oldGlassesSight.VA_R || ''],
      'OG_VA_L' : [vision.oldGlassesSight.VA_L || ''],
      'OG_VA' : [vision.oldGlassesSight.VA || ''],

      // Eye Sight
      'ES_SPH_R' : [vision.eyeSight.SPH_R || ''],
      'ES_SPH_L' : [vision.eyeSight.SPH_L || ''],
      'ES_CYL_R' : [vision.eyeSight.CYL_R || ''],
      'ES_CYL_L' : [vision.eyeSight.CYL_L || ''],
      'ES_Ax_R' : [vision.eyeSight.Ax_R || ''],
      'ES_Ax_L' : [vision.eyeSight.Ax_L || ''],
      'ES_VA_Dist_R' : [vision.eyeSight.VA_Dist_R || ''],
      'ES_VA_Dist_L' : [vision.eyeSight.VA_Dist_L || ''],
      'ES_VA_Dist' : [vision.eyeSight.VA_Dist || ''],
      'ES_ADD_R' : [vision.eyeSight.ADD_R || ''],
      'ES_ADD_L' : [vision.eyeSight.ADD_L || ''],
      'ES_VA_Near' : [vision.eyeSight.VA_Near || ''],
      'ES_Prism_R' : [vision.eyeSight.Prism_R || ''],
      'ES_Prism_L' : [vision.eyeSight.Prism_L || ''],
      'ES_Remark' : [vision.eyeSight.remark || ''],

      // New Glasses
      'NG_SPH_R' : [vision.newGlassesSight.SPH_R || ''],
      'NG_SPH_L' : [vision.newGlassesSight.SPH_L || ''],
      'NG_CYL_R' : [vision.newGlassesSight.CYL_R || ''],
      'NG_CYL_L' : [vision.newGlassesSight.CYL_L || ''],
      'NG_Ax_R' : [vision.newGlassesSight.Ax_R || ''],
      'NG_Ax_L' : [vision.newGlassesSight.Ax_L || ''],
      'NG_VA' : [vision.newGlassesSight.VA || ''],
      'NG_ADD_R' : [vision.newGlassesSight.ADD_R || ''],
      'NG_ADD_L' : [vision.newGlassesSight.ADD_L || ''],
      'NG_PD_Dist_R' : [vision.newGlassesSight.PD_Dist_R || ''],
      'NG_PD_Dist_L' : [vision.newGlassesSight.PD_Dist_L || ''],
      'NG_PD_Near_R' : [vision.newGlassesSight.PD_Near_R || ''],
      'NG_PD_Near_L' : [vision.newGlassesSight.PD_Near_L || ''],
      'NG_PH_R' : [vision.newGlassesSight.PH_R || ''],
      'NG_PH_L' : [vision.newGlassesSight.PH_L || ''],
      'NG_Remark' : [vision.newGlassesSight.remark || ''],

      // Contact Lens
      'CL_SPH_R' : [vision.contactLensSight.SPH_R || ''],
      'CL_SPH_L' : [vision.contactLensSight.SPH_L || ''],
      'CL_CYL_R' : [vision.contactLensSight.CYL_R || ''],
      'CL_CYL_L' : [vision.contactLensSight.CYL_L || ''],
      'CL_Ax_R' : [vision.contactLensSight.Ax_R || ''],
      'CL_Ax_L' : [vision.contactLensSight.Ax_L || ''],
      'CL_BC_R' : [vision.contactLensSight.BC_R || ''],
      'CL_BC_L' : [vision.contactLensSight.BC_L || ''],
      'CL_Remark' : [vision.contactLensSight.remark || ''],
    };
  }

  addVisionCheck(): void {
    const newVision = new VisionCheck();
    this.customer.visionChecks.splice(0, 0, newVision);
    this.selectVisionPage(0);
    this.isAdding = true;
    this.isEditing = true;
  }

  cancelEditing(): void {
    //confirm reset if any changes.
    // if (this.visionForm.dirty) {
    // }

    if (this.isAdding) {
      // remove current object.
      this.customer.visionChecks.splice(0, 1);
      this.vision = this.customer.visionChecks[this.pageIndex];
    }

    this.visionForm.reset(this.populateFormValues(this.vision));

    // disable form if there are existing checks
    if (this.customer.visionChecks && this.customer.visionChecks.length > 0) {
      this.isEditing = false;
    }

    this.isAdding = false;
  }

  selectVisionPage(index: number): void {
    this.pageIndex = index;
    this.vision = this.customer.visionChecks[this.pageIndex];
    this.visionForm.setValue(this.populateFormValues(this.vision));
  }

  // save customer root object child vision will automatically saved alongside.
  saveCustomerVision(formValue: any) {

    const vision = this.setVisionValue(formValue);
    const now = new Date();

    // first check ever!!
    if (!this.customer.visionChecks) {
      this.customer.visionChecks = new Array<VisionCheck>();
      this.customer.visionChecks.push(vision);
    }

    if (!vision.checkedAt) {
      vision.checkedAt = now.getTime();
      vision.checkedBy = 'developer';
    } else {
      vision.updatedAt = now.getTime();
      vision.updatedBy = 'developer';

      this.customer.visionChecks[this.pageIndex] = vision;
    }

    this.customer.updatedAt = now.getTime();
    this.customerService.updateCustomer(this.customer.$key, this.customer);

    this.isEditing = false;
    this.isAdding = false;

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
    this.vision.oldGlassesSight.SPH_R = formValue.OG_SPH_R;
    this.vision.oldGlassesSight.SPH_L = formValue.OG_SPH_L;
    this.vision.oldGlassesSight.CYL_R = formValue.OG_CYL_R;
    this.vision.oldGlassesSight.CYL_L = formValue.OG_CYL_L;
    this.vision.oldGlassesSight.Ax_R = formValue.OG_Ax_R;
    this.vision.oldGlassesSight.Ax_L = formValue.OG_Ax_L;
    this.vision.oldGlassesSight.PD_Dist_R = formValue.OG_PD_Dist_R;
    this.vision.oldGlassesSight.PD_Dist_L = formValue.OG_PD_Dist_L;
    this.vision.oldGlassesSight.PD_Near_R = formValue.OG_PD_Near_R;
    this.vision.oldGlassesSight.PD_Near_L = formValue.OG_PD_Near_L;
    this.vision.oldGlassesSight.PH_R = formValue.OG_PH_R;
    this.vision.oldGlassesSight.PH_L = formValue.OG_PH_L;
    this.vision.oldGlassesSight.VA_R = formValue.OG_VA_R;
    this.vision.oldGlassesSight.VA_L = formValue.OG_VA_L;
    this.vision.oldGlassesSight.VA = formValue.OG_VA;

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

    // old glasses sight.
    this.vision.newGlassesSight.SPH_R = formValue.NG_SPH_R;
    this.vision.newGlassesSight.SPH_L = formValue.NG_SPH_L;
    this.vision.newGlassesSight.CYL_R = formValue.NG_CYL_R;
    this.vision.newGlassesSight.CYL_L = formValue.NG_CYL_L;
    this.vision.newGlassesSight.Ax_R = formValue.NG_Ax_R;
    this.vision.newGlassesSight.Ax_L = formValue.NG_Ax_L;
    this.vision.newGlassesSight.VA = formValue.NG_VA;
    this.vision.newGlassesSight.ADD_R = formValue.NG_ADD_R;
    this.vision.newGlassesSight.ADD_L = formValue.NG_ADD_L;
    this.vision.newGlassesSight.PD_Dist_R = formValue.NG_PD_Dist_R;
    this.vision.newGlassesSight.PD_Dist_L = formValue.NG_PD_Dist_L;
    this.vision.newGlassesSight.PD_Near_R = formValue.NG_PD_Near_R;
    this.vision.newGlassesSight.PD_Near_L = formValue.NG_PD_Near_L;
    this.vision.newGlassesSight.PH_R = formValue.NG_PH_R;
    this.vision.newGlassesSight.PH_L = formValue.NG_PH_L;
    this.vision.newGlassesSight.remark = formValue.NG_Remark;

    // contact lens sight
    this.vision.contactLensSight.SPH_R = formValue.CL_SPH_R;
    this.vision.contactLensSight.SPH_L = formValue.CL_SPH_L;
    this.vision.contactLensSight.CYL_R = formValue.CL_CYL_R;
    this.vision.contactLensSight.CYL_L = formValue.CL_CYL_L;
    this.vision.contactLensSight.Ax_R = formValue.CL_Ax_R;
    this.vision.contactLensSight.Ax_L = formValue.CL_Ax_L;
    this.vision.contactLensSight.BC_R = formValue.CL_BC_R;
    this.vision.contactLensSight.BC_L = formValue.CL_BC_L;
    this.vision.contactLensSight.remark = formValue.CL_Remark;

    return this.vision;
  }

}

