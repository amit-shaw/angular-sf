import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { NaicsCodeEditComponent } from '../naics-code-edit/naics-code-edit.component';



@Component({
  selector: 'app-naics-code',
  templateUrl: './naics-code.component.html',
  styleUrls: ['./naics-code.component.css']
})
export class NaicsCodeComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(NaicsCodeEditComponent, {
      height: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit() {
  }

}
