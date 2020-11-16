import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
export interface PeriodicElement {
  priority: string;
  alarms: string;
  faults: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardDataList: any = [];
  page = 1;
  count = 0;
  tableSize = 6;
  tableSizes = [3, 6, 9, 12];
  L1val: any;
  L2val: any;
  image: any;
  imagePath = './assets/images/placeholder_building.png';
  constructor(public apiService: ApiService, private spinnerService: NgxSpinnerService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() {
    this.spinnerService.show();
    this.apiService.getDashboardData('All', []).subscribe((response: any) => {
      this.dashboardDataList = response;
      this.spinnerService.hide();
    });
  }
  onTableDataChange(event): void {
    this.page = event;
    this.fetchDashboardData(this.L1val, this.L2val);
  }
  fetchDashboardData(L1val: any, L2val: any): void {
    this.spinnerService.show();
    if (L2val === undefined || L2val === null) {
      L2val = [];
    }
    L2val = L1val === 'ALL' ? [] : L2val;
    L1val = L1val === undefined || L1val === null ? 'ALL' : L1val;
    this.apiService.getDashboardData(L1val, L2val).subscribe((response: any) => {
      this.dashboardDataList = response;
      this.spinnerService.hide();
    });
  }
  iconClick(): void {
    // window.open('https://www.google.com/');
  }
  applyFilter(event: any): void {
    this.page = 1;
    const requestObject = [];
    for (const value of event.L2val) {
      requestObject.push({ id: value.id });
    }
    this.L1val = event.L1val;
    this.L2val = requestObject;
    this.fetchDashboardData(event.L1val, requestObject);
  }
  convertImageData(data: any): any {
    const objectURL = 'data:image/jpeg;,' + data;
    return this.domSanitizer.bypassSecurityTrustUrl(objectURL);
  }

}
