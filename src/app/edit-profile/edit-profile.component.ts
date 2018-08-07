import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../getdata.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private getdataService:GetdataService) { }
  basic_set:any;
  print:boolean=false;
  ngOnInit() {
    this.getdataService.getSettingsData();
   // this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);


  }
  printProfile(){
    this.print = true;
   /* let location = window.location.href;
    let printContents, popupWin;
   // printContents = document.getElementById('profile-print').innerHTML;
    popupWin = window.open(location, '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.print(); */
  }


}
