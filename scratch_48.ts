export interface jobsObject {
    Data_Scientist: 'Data Scientist';
    DevOps_Engineer: 'DevOps Engineer';
    System_Engineer: 'System Engineer';
    Product_Manager: 'Product Manager';
    Student: 'Student';
    Etc: 'Etc';
}

const test: jobsObject[keyof jobsObject] = 'Data Scientist'


