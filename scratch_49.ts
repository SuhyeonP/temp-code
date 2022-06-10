
export interface ILicenseType {
    Community: 'Community';
    Premium_Trial: 'Premium_Trial';
    Premium: 'Premium';
    Open_Network: 'Open_Network';
    Closed_Network: 'Closed_Network';
}
export interface ILicenseDetail {
    label: string;
    id: keyof ILicenseType;
    isGroup: boolean;
}
export const licenseObject: Record<keyof ILicenseType, ILicenseDetail> = {
    Community: {
        id: 'Community',
        isGroup: false,
        label: '개인 무료',
    },
    Premium_Trial: {
        id: 'Premium_Trial',
        isGroup: false,
        label: '개인 유료 체험',
    },
    Premium: {
        id: 'Premium',
        isGroup: false,
        label: '개인 유료',
    },
    Open_Network: {
        id: 'Open_Network',
        isGroup: true,
        label: 'Open network',
    },
    Closed_Network: {
        id: 'Closed_Network',
        isGroup: true,
        label: 'Close network',
    },
};

console.log(Object.values(licenseObject).map((ele) => ele.label))

export interface ICheckForm {
    null: null;
    regexp: 'regExp';
    duplicate: 'duplicate';
    required: 'required';
}

const sa: keyof ICheckForm = 'regexp'

const aa = (data: keyof ICheckForm) => {
    console.log(da)
}
