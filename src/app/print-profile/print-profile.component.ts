import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';
import { BasicData } from '../basic-info-edit/basicData';
import { ServiceData } from '../company-contact-edit/service-data';
import { ProjectData } from '../project-info/project-data';
import { RegQuestionData } from '../registration-question/registration-data';
import { CustomBarcode } from '../basic-info-edit/customBarCode';
import { SafeHtmlPipe } from '../safe-html';

@Component({
  selector: 'app-print-profile',
  templateUrl: './print-profile.component.html',
  styleUrls: ['./print-profile.component.css']
})
export class PrintProfileComponent implements OnInit {

  constructor(private getdataService:GetdataService) { }
  basic:BasicData;
  work_set:any[];
  basic_set:any[];
  speaker:any[];
  custom_barcode:CustomBarcode;

  settings:any[];
  ethinicity:ServiceData;
  revenue:ServiceData;
  no_of_emp:ServiceData;
  georeason:ServiceData;
  bsnstr:ServiceData;

  naics:any[];
  naics_set:any[];
  diversity_val:any[];
  commodities:any[];
  sub_commodities:any[];
  project:ProjectData[];

  reg_ques:RegQuestionData[];
  event_ques:RegQuestionData[];
  print_status:boolean = false;
  ngOnInit() {
    $(".Mask").show();
    this.getdataService.print_status.subscribe(print_status => this.print_status = print_status);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);
    this.getdataService.speaker.subscribe(speaker => this.speaker = speaker);
    this.getdataService.custom_barcode_cast.subscribe(custom_barcode => this.custom_barcode = custom_barcode);

    this.getdataService.settings.subscribe(settings => this.settings = settings);
    this.getdataService.ethinicity.subscribe(ethinicity => this.ethinicity = ethinicity);
    this.getdataService.no_of_emp.subscribe(no_of_emp => this.no_of_emp = no_of_emp);
    this.getdataService.georeason.subscribe(georeason => this.georeason = georeason);
    this.getdataService.revenue.subscribe(revenue =>this.revenue = revenue);
    this.getdataService.bsnstr.subscribe(bsnstr =>this.bsnstr = bsnstr);

    this.getdataService.naics.subscribe(naics => this.naics = naics);
    this.getdataService.naics_set.subscribe(naics_set => this.naics_set = naics_set);
    this.getdataService.diversity_val.subscribe(diversity_val =>this.diversity_val = diversity_val);
    this.getdataService.commodities.subscribe(commodities => this.commodities = commodities);
    this.getdataService.sub_commodities.subscribe(sub_commodities => this.sub_commodities = sub_commodities);

    this.getdataService.project.subscribe(project => this.project = project);

    this.getdataService.reg_ques.subscribe(reg_ques => this.reg_ques = reg_ques);
    this.getdataService.event_ques.subscribe(event_ques =>this.event_ques = event_ques);
    console.log("caming here home address__r");
    console.log(this.basic.Home_Address__r);
    console.log(this.print_status);
    setTimeout(function(){
      $(".Mask").hide();
      let el:HTMLElement = document.getElementById("printbtn");
      el.click(); 
    },2500);
   // this.getdataService.backToEditorPart();
   setTimeout(() => {
     $(".Mask").show();
   },2200)
    setTimeout(() =>{
      //window.location.href=window.location.href;
      console.log("came here");
      $(".Mask").hide();
      this.getdataService.backToEditorPart();
      console.log(this.print_status);
    },2700);
  }
  goBackToEdit(){
   // this.getdataService.backToEditorPart();
    this.getdataService.print_status.next(false);
  }
  print(): void {
    //window.prin
    let location = window.location.href;
    let printContents, popupWin;
    printContents = document.getElementById('profile-print').innerHTML;
    popupWin = window.open(location, '_blank', 'top=0,left=0,height=100%,width=auto');
   /* popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    ); */
    popupWin.print();
    popupWin.document.close();
}
  goBack(){
    window.location.reload();
  }
}
