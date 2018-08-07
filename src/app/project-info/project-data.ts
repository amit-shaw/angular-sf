export interface ProjectData{
    Id:string,
    Capital_Required__c:string,
    Financing_Structure__c:string,
    Interested_formats_of_cooperation__c:string,
    Investment_Round__c:string,
    Project_Custom_Currency__c:string,
    Project_Custom_Date_time__c:string,
    Project_Custom_Number_1__c:string,
    Project_Custom_Number_2__c:string,
    Project_Custom_Picklist__c:string,
    Project_Custom_Rich_Text_Area__c:string,
    Project_Custom_Text__c:string,
    Project_Custom_Text_2__c:string,
    Project_Description_2__c:string,
    Project_Description__c:string,
    Project_Location__c:string,
    Project_Name_2__c:string,
    Project_Name__c:string,
    Sectors__c:string,
    Sub_Sectors__c:string
}
export interface projectList{
    records:ProjectData[],
}