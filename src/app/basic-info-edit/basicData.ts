import { AddressData } from "../work-address-edit/address-data";
import { ProjectData, projectList } from "../project-info/project-data";

export interface BasicData{
    First_Name__c: string, 
    Last_Name__c :string,
    Custom_Barcode__c:string,
    Email__c:string,
    DOB__c:string,
    Gender__c:string,
    Age__c:string,
    Home_Phone__c:string,
    Work_Phone__c:string,
    Mobile__c:string,
    TKT_Job_Title__c:string,
    TKT_Company__c:string,
    Prefix__c:string,
    Suffix__c:string,
    verify_Email__c:string,
    DBA__c:string,
    Company_Logo__c:string,
    User_Pic__c:string,
    FaceBookId__c:string,
    LinkedInId__c:string,
    TwitterId__c:string,
    Instagram__c:string,
    Video__c:string,
    Home_Address__r:AddressData,
    Work_Address__r:AddressData,
    Billing_Address__r:AddressData,
    BBB_Number__c:string,
    Primary_Business_Category__c:string,
    Secondary_Business_Category__c:string,
    ScopeOfWork2__c:string,
    Established_Date__c:string,
    Duns_Number__c:string,
    Exceptional_Keywords__c:string,
    FaxNumber__c:string,
    Company_Description__c:string,
    Blog_URL__c:string,
    CageCode__c:string,
    Company_Website_URL__c:string,
    distribution_Country__c:string,
    GSA_Schedule__c:string,
    Keywords__c:string,
    Manufactures_Country__c:string,
    Outside_Facilities__c:string,
    References1__c:string,
    References2__c:string,
    ScopeOfWork1__c:string,
    Tax_Id__c:string,
    Year_in_business__c:string,
    Secondary_email__c:string,
    Biography__c:string,
   // BLN_Projects__r:projectList,
  }