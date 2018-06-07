import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { CompanyProfileEditComponent } from '../company-profile-edit/company-profile-edit.component';



declare var $ :any;

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
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
    
  }

}
