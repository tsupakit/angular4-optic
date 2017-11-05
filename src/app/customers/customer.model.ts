abstract class Sight {
    SPH_R: string;
    SPH_L: string;

    CYL_R: string;
    CYL_L: string;

    Ax_R: string;
    Ax_L: string;
}

class OldGlassesSight extends Sight {
    PD_Dist_R: string;
    PD_Dist_L: string;
    PD_Near_R: string;
    PD_Near_L: string;

    PH_R: string;
    PH_L: string;
    VA_R: string;
    VA_L: string;
    VA: string; //L & R

    static SampleData(): OldGlassesSight {
        let oldGlasses = new OldGlassesSight();
        oldGlasses.SPH_R = '-3';
        oldGlasses.SPH_L = '-3.5';
        oldGlasses.VA_R = '0.08';
        oldGlasses.VA = '0.08';

        return oldGlasses;
    }
}

class EyeSight extends Sight {
    VA_R: string;
    VA_L: string;
    VA: string; //L & R

    Add_R: string;
    Add_L: string;
    VA_Near: string;
    Prism_R: string;
    Prism_L: string;

    remark: string;

    static SampleData() : EyeSight {
        let sight = new EyeSight();
        sight.SPH_R = '-6';
        sight.SPH_L = '-9.5';
        sight.CYL_R = '-0.5';
        sight.CYL_L = '-2.25';
        sight.Ax_R = '16.5';
        sight.Ax_L = '5';
        sight.VA_R = '0.6';
        sight.VA_L = '0.5';
        sight.VA = '0.6';
        sight.Add_R = '1.5';
        sight.Add_L = '1.5';

        sight.remark = 'test';

        return sight;
    }
}

class NewGlassesSight extends Sight {

}

class ContactLensSight extends Sight {

}

export class VisionCheck {
    checkedAt: Object; //represent as date time in string format
    checkedBy: string;

    updatedAt: Object; //represent as date time in string format
    updatedBy: string;

    //sight information
    VASC_R: string;
    VASC_L: string;
    VASC: string; //L & R
    PinH_R: string;
    PinH_L: string;
    PD_Dist_R: string;
    PD_Dist_L: string;
    PD_Near_R: string;
    PD_Near_L: string;

    oldGlassesSight: OldGlassesSight;
    eyeSight: EyeSight;
    //newGlassesSight: NewGlassesSight;
    //contactLensSight: ContactLensSight;

    /**
     *
     */
    constructor() {
        this.oldGlassesSight = new OldGlassesSight();
        this.eyeSight = new EyeSight();
    }

    static initOldGlassesSight = (vision: VisionCheck) => { 
        vision.oldGlassesSight = new OldGlassesSight();
    }

    static initEyeSight = (vision: VisionCheck) => { 
        vision.eyeSight = new EyeSight();
    }

    static SampleData() : VisionCheck {
        const vision = new VisionCheck();
        vision.checkedAt = new Date().toLocaleDateString();
        vision.oldGlassesSight = OldGlassesSight.SampleData();
        vision.eyeSight = EyeSight.SampleData();        

        return vision;
    }
}

export class Customer {
    //profile
    $key: string;
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    telephoneNo: string;
    address: string;
    job: string;    
    cc: string; //reason
    remark: string;
    createdAt: Object; //firebase.database.ServerValue.TIMESTAMP
    updatedAt: Object; //firebase.database.ServerValue.TIMESTAMP

    // //sight information
    // VASC_R: string;
    // VASC_L: string;
    // VASC: string; //L & R
    // PinH_R: string;
    // PinH_L: string;
    // PD_Dist_R: string;
    // PD_Dist_L: string;
    // PD_Near_R: string;
    // PD_Near_L: string;

    visionChecks: VisionCheck[];

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    static SampleData() : Customer {
        const customer = new Customer('ณิชกานต์', 'อินสว่าง');
        customer.age = 43;
        customer.sex = 'F';
        customer.telephoneNo = '0879032818';
        customer.cc = 'แว่นเดิมมองไม่ชัด';

        customer.visionChecks = [ VisionCheck.SampleData() ];

        return customer;
    }

}