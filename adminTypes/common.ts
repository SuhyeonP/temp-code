export interface IResponseUserError {
    code: string;
    v: any;
}

export interface IDetailError {
    loc: string[];
    msg: string;
    type: string;
}

export interface IResponseError {
    detail: IDetailError[];
}

export interface IResponseSuccessData<T> {
    ok: boolean;
    result: T;
    err: IResponseUserError;
}

export interface IStoreCommon {
    isLoading: boolean;
    err: IResponseUserError | IResponseError | null;
}

export interface IListResponse<T> {
    total_count: number;
    items: T[];
}

export class PersonalInfo {
    last_name: string = '';
    first_name: string = '';
    job_title: string = '';
    phone_number?: string | null = null;
}

// import { enableES5, produce } from 'immer';
//
// export default (...args) => {
//     enableES5();
//     return produce(...args);
// };

// adminStore

export class AdminState {
    bearer_token: string | null = null;
}

export type AdminStoreType = AdminState & IStoreCommon;

const adminInitState: AdminStoreType = {
    isLoading: false,
    err: null,
    bearer_token: null,
}

// customers

export const licenseObject = {
    Community: 'Community',
    Premium_Trial: 'Premium_Trial',
    Premium: 'Premium',
    Open_Network: 'Open_Network',
    Closed_Network: 'Closed_Network',
}

export class DataSorting {
    isTotal: boolean = true;
    isGroup: boolean | null = null;
    isAvailable: boolean | null = null;
    search: string | null = null;
    customer_license_class: keyof typeof licenseObject | null = null;
    date_range: [Date, Date] | null = null;
}

export type CustomerType = 'Personal' | 'Enterprise';
export type State = 'Valid' | 'InValid' | 'Expired' | 'Archived' | 'Deleted';

export class RegisterCustomer extends PersonalInfo {
    member_max: number = 0;
    customer_license_class: keyof typeof licenseObject = 'Community';
    customer_type: CustomerType = 'Personal';
    company: string = '';
}

export class CustomerInfo extends RegisterCustomer {
    customer_id: number = 0;
    issue_date: string = new Date().toISOString();
    expiration_date: string = new Date().toISOString();
    customer_license_state: State = 'Valid';
    member_count: number = 0;
}

export class SelectingCustomers {
    selectedCustomers: number[] = [];
    customers: CustomerInfo[] = [];
}

export type ClientStoreType = IStoreCommon & DataSorting & SelectingCustomers;

export const clientInitState: ClientStoreType = {
    isLoading: false,
    err: null,
    isTotal: true,
    isGroup: null,
    isAvailable: null,
    search: null,
    customer_license_class: null,
    date_range: null,
    selectedCustomers: [],
    customers: []
}

// customer

export class RegisterMember extends PersonalInfo {
    customer_id: number = 0;
    department?: string;
}

export class EditMember extends RegisterMember {
    member_id: number = 0;
    workspace?: string = '';
}

export class Member extends EditMember {
    state?: State = 'Valid';
    member_license_key: string = '';
}

export class SelectedMembers {
    selectedMembers: Member[] = [];
    members: Member[] = [];
}

export type CustomerStore = IStoreCommon & SelectedMembers & CustomerInfo;

export const customerInitState: CustomerStore = {
    isLoading: false,
    err: null,
    customer_id: 0,
    member_count: 0,
    member_max: 0,
    selectedMembers: [],
    members: [],
    company: '',
    first_name: '',
    last_name: '',
    customer_license_class: 'Community',
    customer_type: 'Personal',
    job_title: '',
    issue_date: new Date().toISOString(),
    expiration_date: new Date().toISOString(),
    customer_license_state: 'Valid',
}

// alert - email


