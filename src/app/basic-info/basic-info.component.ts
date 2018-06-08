import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { BasicInfoEditComponent } from '../basic-info-edit/basic-info-edit.component';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.css']
})
export class BasicInfoComponent implements OnInit {

  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(BasicInfoEditComponent, {
      height: '500px'
      //width:'500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
  }
  url = '../../assets/profile-placeholder.png';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader:any
      reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.currentTarget.result;
        console.log(event);
      }
    }
  }

}
