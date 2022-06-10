
export interface IJobsType {
    Data_Analyst: 'Data Analyst';
    Data_Scientist: 'Data Scientist';
    Data_Engineer: 'Data Engineer';
    DevOps_Engineer: 'DevOps Engineer';
    MLOps_Engineer: 'MLOps Engineer';
    System_Engineer: 'System Engineer';
    'S/W_Engineer': 'S/W Engineer';
    Marketing_Manager: 'Marketing Manager';
    Product_Manager: 'Product Manager';
    Sales_Manager: 'Sales Manager';
    Student: 'Student';
    Etc: 'Etc';
}
export const jobsObject: IJobsType = {
    Data_Analyst: 'Data Analyst',
    Data_Scientist: 'Data Scientist',
    Data_Engineer: 'Data Engineer',
    DevOps_Engineer: 'DevOps Engineer',
    MLOps_Engineer: 'MLOps Engineer',
    System_Engineer: 'System Engineer',
    'S/W_Engineer': 'S/W Engineer',
    Marketing_Manager: 'Marketing Manager',
    Product_Manager: 'Product Manager',
    Sales_Manager: 'Sales Manager',
    Student: 'Student',
    Etc: 'Etc',
};

console.log(Object.values(jobsObject))
console.log(Object.keys(jobsObject))

const test: keyof IJobsType = 'Data_Scientist'
