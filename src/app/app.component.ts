import { Component, OnInit } from '@angular/core';
import { CreditcardService } from './services/creditcard.service';
import { CreditCardFraudReponse, CreditCardFraud } from './model/common.model';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {Moment} from 'moment';

const moment =  _moment;


// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class AppComponent implements OnInit {

  constructor(private commonService: CreditcardService) {
    this.getCharacters();
  }

  date = new FormControl(moment());

  months;
  years = [];

  // tslint:disable-next-line:member-ordering
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // tslint:disable-next-line:member-ordering
  dataSource = ELEMENT_DATA;
  // tslint:disable-next-line:member-ordering
  category = '';
  // tslint:disable-next-line:member-ordering
  public chartType = 'line';

  // tslint:disable-next-line:member-ordering
  public chartDatasets: Array<any> = [
    { data: [1000, 300, 450, 900, 100, 670, 200, 789, 345, 123, 76, 89, 0, 123, 56, 0, 0, 0, 0, 0, 456, 900, 123, 435, 890, 123] },
  ];

  // tslint:disable-next-line:member-ordering
  public chartLabels: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

  // tslint:disable-next-line:member-ordering
  public chartColors: Array<any> = [
    {
      borderColor: 'blue',
      borderWidth: 1,
    }
  ];

  // tslint:disable-next-line:member-ordering
  public chartOptions: any = {
    responsive: true
  };

  // tslint:disable-next-line:member-ordering
  public doughnutchartType = 'doughnut';

  // tslint:disable-next-line:member-ordering
  public doughnutchartDatasets: Array<any> = [
    { data: [300, 50], label: 'My First dataset' }
  ];

  // tslint:disable-next-line:member-ordering
  public doughnutchartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#949FB1'],
      hoverBackgroundColor: ['#FF5A5E', '#A8B3C5', '#616774'],
      borderWidth: 0,
    }
  ];

  public doughnutchartOptions: any = {
    responsive: true,
    tooltips: {enabled: false},
  };

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  ngOnInit() {
    this.getDates();
  }

  getCharacters() {
    this.commonService.getCharacters().subscribe((data: CreditCardFraudReponse) => {
    });
  }
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  public doughnutchartClicked(e: any): void { }
  public doughnutchartHovered(e: any): void { }

  getDates() {
    const date = new Date();
    const currentYear = date.getFullYear() - 30;

    // set values for year dropdown
    for (let i = 0; i <= 100; i++) {
      this.years.push(currentYear + i);
    }

    // set values for month dropdown
    this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
     'September', 'October', 'November', 'December'];
  }
}
