import { Component } from '@angular/core';
import { CreditcardService } from './services/creditcard.service';
import { CreditCardFraudReponse, CreditCardFraud } from './model/common.model';

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
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  months = [];
  years = [];
  constructor(private commonService: CreditcardService) {
    this.getCharacters();
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  category = '';
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
    // hover: {mode: null},
  };

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
    const currentYear = date.getFullYear();

    // set values for year dropdown
    for (let i = 0; i <= 100; i++) {
      this.years.push(currentYear + i);
    }

    // set values for month dropdown
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
}
