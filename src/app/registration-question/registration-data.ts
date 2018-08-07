export interface RegQuestionData {
    SelectedAnswer:string,
    SelectedAnswerCheck:any[],
    isRequired:string,
    itq:Itqdata,
    Question__r:QuestionData,
    optionList:Answer[]
}
export interface Itqdata{
    Id:string,
    Question_Level__c:string,
    Question__r:QuestionData,
}
export interface QuestionData{
    Answer_Type__c:string,
    Question_Order__c:string,
    Question_Text__c:string,
    BLN_Parent_Answer__c:string,
}
export interface Answer{
    Id:string,
    Answer_Text__c:string,
    BLN_Question__c:string,
}
