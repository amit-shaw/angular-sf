import { Component, OnInit } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';


@Component({
  selector: 'app-naics-code',
  templateUrl: './naics-code.component.html',
  styleUrls: ['./naics-code.component.css']
})
export class NaicsCodeComponent implements OnInit {

  constructor() { }
  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];
  public current: string;
  ngOnInit() {
    this.exampleData = [
      {
        id: '111110',
        text: 'Soyabean Farming'
      },
      {
        id: '111120',
        text: 'Oilseed(Except Soyabean) Farming'
      },
      {
        id: '111130',
        text: 'Dry Pea and Bean Farming'
      },
      {
        id: '111140',
        text: 'Wheat Farming'
      },
      {
        id:'111150',
        text:'Rice Farming'
      }
    ];
    this.value = ['111110', '111150'];

    this.options = {
      multiple: true
    }

    this.current = this.value.join(' | ');
  }
  changed(data: {value: string[]}) {
    this.current = data.value.join(' | ');
  }

}
