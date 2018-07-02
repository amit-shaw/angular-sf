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
  ngOnInit() {
    this.getdataService.getSettingsData();
   // this.getdataService.basic_set_cast.subscribe(basic_set => this.basic_set = basic_set);


  }


}
