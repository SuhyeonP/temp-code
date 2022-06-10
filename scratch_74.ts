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

type State = '' | 'a';
type RoleType = '' | 'a';
type PlanType = 'community' | 'enterprise';
// state 전체 종류
interface IMember {
  email: string;
  last_name: string;
  first_name: string;
  company_id: number;
}

// member base 조회 및 수정
interface IMemberBase extends IMember, Pick<IMemberDate, 'create_date'> {
  job_title: IJobsType;
  state: State;
  role: RoleType;
}

interface IPlan {
  plan: PlanType;
}

interface ILicense {
  license: 'free';
}

type IRegisterMember = IMember & IPlan & Pick<ILicense, 'license'>;

interface IMemberDate {
  create_date: string; // non editable
  last_use_date: string;
  market_agree_date: string;
}

type IMembers = Pick<IMember, 'email' | 'first_name' | 'last_name'> & IPlan & IMemberDate ;

interface IMemberUsingInfo {

}
