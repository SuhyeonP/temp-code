export interface IJobsType {
  Data_Analyst: 'Data Analyst';
  Data_Scientist: 'Data Scientist';
  Data_Engineer: 'Data Engineer';
  DevOps_Engineer: 'DevOps Engineer';
  ML_Engineer: 'ML Engineer';
  MLOps_Engineer: 'MLOps Engineer';
  System_Engineer: 'System Engineer';
  'S/W_Engineer': 'S/W Engineer';
  Marketing_Manager: 'Marketing Manager';
  Product_Manager: 'Product Manager';
  Sales_Manager: 'Sales Manager';
  Student: 'Student';
  Etc: 'Etc';
}

interface IMember {
  // member 기본 데이터
  id: number;
  email: string;
  last_name: string;
  first_name: string;
  job_title: IJobsType;
  role: string;
  create_date:string;
  state: string;
  organization: string;

  company_id?: number;
  company_name?: string;
}

export type StateType = 't' | 'a';
export type PriceType = '';

// todo plan, license 확실해지면 & 로 붙이기
interface IRegisterMember extends Omit<IMember, 'id' | 'role' | 'create_date' | 'company_name' | 'state'>{

}

type IEditMemberBaseInfo = Partial<IMember>;

// todo check license edit
// interface IMemberPlanInfo extends Pick<ILicense, 'name' | 'start_date' | 'end_date'>{
//   plan: Pick<IPlan, 'plan'>;
// }

// todo check product_key interface

interface IUserLog {
  first_use_date: string;
  last_use_date: string;
  product_type: string;
  os: 'window' | 'linux' | 'mac';
  python_version: string;
  product_version: string;
  last_update_date: string;
}

interface ICompany {
  id: number;
  name: string;
  phone_number: string;
  member_count: number;
  create_date: string;
  state: string;
}

interface IPlan {
  id: number;
  type: string;
  state: string;
}

interface ILicense {
  id: number;
  state: string;
  type: string;
}

interface IStartEndDate {
  start_date: string;
  end_date: string;
}

interface IProductKey {
  id: number;
  product_key: string;
  state: string;
}

interface ITermsOfUse {
  id: number;
  title: string; // 이용 약관 제목
  required: boolean; // 필수 동의
  content: string; // 내용
}

type FilteringDate = 'create_date' | 'last_use_date' | '마켓팅동의일';

type WithStartEndDate<T> = T & IStartEndDate;





