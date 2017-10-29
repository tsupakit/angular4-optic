abstract class Sight {
    SPH_R: number;
    SPH_L: number;

    CYL_R: number;
    CYL_L: number;
    
    Ax_R: number;
    Ax_L: number;
}

class OldGlassesSight extends Sight {
    PD_Dist_R: number;
    PD_Dist_L: number;
    PD_Near_R: number;
    PD_Near_L: number;

    PH_R: number;
    PH_L: number;
    VA_R: number;
    VA_L: number;
    VA: number; //L & R

    static SampleData() : OldGlassesSight {
        let oldGlasses = new OldGlassesSight();
        oldGlasses.SPH_R = -3;
        oldGlasses.SPH_L = -3.5;
        oldGlasses.VA_R = 0.08;
        oldGlasses.VA = 0.08;

        return oldGlasses;
    }
}

class EyeSight extends Sight {
    VA_R: number;
    VA_L: number;
    VA: number; //L & R

    Add_R: number;
    Add_L: number;
    VA_Near: number;
    Prism_R: number;
    Prism_L: number;

    remark: string;

    static SampleData() : EyeSight {
        let sight = new EyeSight();
        sight.SPH_R = -6;
        sight.SPH_L = -9.5;
        sight.CYL_R = -0.5;
        sight.CYL_L = -2.25;
        sight.Ax_R = 16.5;
        sight.Ax_L = 5;
        sight.VA_R = 0.6;
        sight.VA_L = 0.5;
        sight.VA = 0.6
        sight.Add_R = 1.5;
        sight.Add_L = 1.5;

        sight.remark = 'test';

        return sight;
    }
}

class NewGlassesSight extends Sight {

}

class ContactLensSight extends Sight {

}

class VisionCheck {
    checkedAt: Object; //represent as date time in string format
    oldGlassesSight: OldGlassesSight;
    eyeSight: EyeSight;
    //newGlassesSight: NewGlassesSight;
    //contactLensSight: ContactLensSight;

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

    //sight information
    VASC_R: number;
    VASC_L: number;
    VASC: number; //L & R
    PinH: number;
    PD_Dist_R: number;
    PD_Dist_L: number;
    PD_Near_R: number;
    PD_Near_L: number;

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