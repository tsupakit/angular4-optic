abstract class Sight {
    SPH_R: string;
    SPH_L: string;

    CYL_R: string;
    CYL_L: string;

    Ax_R: string;
    Ax_L: string;
}

class OldGlassesSight extends Sight {
    ADD_R: string;
    ADD_L: string;
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
    VA_Dist_R: string;
    VA_Dist_L: string;
    VA_Dist: string; //L & R

    ADD_R: string;
    ADD_L: string;
    VA_Near: string;
    Prism_R: string;
    Prism_L: string;

    remark: string;

    static SampleData(): EyeSight {
        let sight = new EyeSight();
        sight.SPH_R = '-6';
        sight.SPH_L = '-9.5';
        sight.CYL_R = '-0.5';
        sight.CYL_L = '-2.25';
        sight.Ax_R = '16.5';
        sight.Ax_L = '5';
        sight.VA_Dist_R = '0.6';
        sight.VA_Dist_L = '0.5';
        sight.VA_Dist = '0.6';
        sight.ADD_R = '1.5';
        sight.ADD_L = '1.5';

        sight.remark = 'test';

        return sight;
    }
}

class NewGlassesSight extends Sight {
    VA: string; //L & R
    ADD_R: string;
    ADD_L: string;
    PD_Dist_R: string;
    PD_Dist_L: string;
    PD_Near_R: string;
    PD_Near_L: string;
    PH_R: string;
    PH_L: string;

    remark: string;
}

class ContactLensSight extends Sight {
    BC_R: string;
    BC_L: string;

    remark: string;
}

export class VisionCheck {
    checkedAt: number; //representing a date time
    checkedBy: string;

    updatedAt: number; //representing a date time
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
    newGlassesSight: NewGlassesSight;
    contactLensSight: ContactLensSight;

    //product information
    glasses: string;
    lens: string;
    others: string;

    /**
     *
     */
    constructor() {
        this.checkedAt = new Date().getTime();
        this.oldGlassesSight = new OldGlassesSight();
        this.eyeSight = new EyeSight();
        this.newGlassesSight = new NewGlassesSight();
    }

    static initOldGlassesSight = (vision: VisionCheck) => {
        vision.oldGlassesSight = new OldGlassesSight();
    }

    static initEyeSight = (vision: VisionCheck) => {
        vision.eyeSight = new EyeSight();
    }

    static initNewGlassesSight = (vision: VisionCheck) => {
        vision.newGlassesSight = new NewGlassesSight();
    }

    static initContactLensSight = (vision: VisionCheck) => {
        vision.contactLensSight = new ContactLensSight();
    }

    static SampleData(): VisionCheck {
        const vision = new VisionCheck();
        vision.checkedAt = new Date().getTime();
        vision.oldGlassesSight = OldGlassesSight.SampleData();
        vision.eyeSight = EyeSight.SampleData();

        return vision;
    }
}

export class Customer {
    //profile
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    sex: string;
    telephoneNo: string;
    address: string;
    job: string;
    cc: string; //reason
    remark: string;
    createdAt: number; //firebase.database.ServerValue.TIMESTAMP
    updatedAt: number; //firebase.database.ServerValue.TIMESTAMP

    visionChecks: VisionCheck[];

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    // isNew(): boolean {
    //     return (this.$key) == '';
    // }

    static SampleData(): Customer {
        const customer = new Customer('ณิชกานต์', 'อินสว่าง');
        customer.age = 43;
        customer.sex = 'F';
        customer.telephoneNo = '0879032818';
        customer.cc = 'แว่นเดิมมองไม่ชัด';

        customer.visionChecks = [ VisionCheck.SampleData() ];

        return customer;
    }

}