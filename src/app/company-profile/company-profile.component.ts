import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { CompanyProfileEditComponent } from '../company-profile-edit/company-profile-edit.component';
import { GetdataService } from '../getdata.service';
import { BasicData } from '../basic-info-edit/basicData';
import { SafeHtmlPipe } from '../safe-html';
/*import { DomSanitizer } from '@angular/platform-browser'

//declare var $ :any;
@Pipe({ name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
} */

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  constructor(public dialog: MatDialog,private getdataService:GetdataService) {}
  basic:BasicData;
  work_set:any[];
  openDialog() {
    const dialogRef = this.dialog.open(CompanyProfileEditComponent, {
      height: '500px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
    this.getdataService.work_set_cast.subscribe(work_set => this.work_set = work_set);
    this.getdataService.basic_cast.subscribe(basic => this.basic = basic);
    //console.log(this.basic.Exceptional_Keywords__c);
  }

}
