import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material';
import { ApiService } from 'src/app/api.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  buildings = new FormControl();
  getSiteDdlData: any = [];
  buildingList = [];
  selectedBuildings;
  priority = new FormControl();
  isDdDisabled = true;
  priorityList = [];
  selectedPriority;
  previousLVal: any = [];
  @ViewChild('select1', { static: false }) select1: MatSelect;
  @ViewChild('select2', { static: false }) select2: MatSelect;
  @Output() applyFilter: any = new EventEmitter();
  allSelected = true;
  showAppyBtn = false;
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.buildings.setValue('ALL');
    this.priorityList = [{ label: 'ALL' }];
    this.priority.setValue(this.priorityList);
    this.apiService.getSiteDdlData().subscribe((response: any) => {
      this.getSiteDdlData = response;
      for (const value of this.getSiteDdlData) {
        this.buildingList.push(value.type);
      }
      this.buildingList.unshift('ALL');
    });
    const objValue = { buildings: 'ALL', sites: this.priority.value };
    this.previousLVal = objValue;
  }
  selectionChange(event: any): void {
    this.priorityList = [];
    if (event.value === 'ALL') {
      this.priorityList = [{ label: 'ALL' }];
      this.priority.setValue(this.priorityList);
    } else {
      const siteObject = this.getSiteDdlData.find(data => data.type === event.value);
      if (siteObject) {
        for (const value of siteObject.lstSites) {
          this.priorityList.push(value);
        }
        this.priority.setValue(this.priorityList);
        this.allSelected = true;
      }
    }
    const compareObj = { buildings: this.selectedBuildings, sites: this.priority.value };
    if (JSON.stringify(this.previousLVal).toLowerCase() === JSON.stringify(compareObj).toLowerCase()) {
      this.showAppyBtn = false;
    } else {
      this.showAppyBtn = true;
    }
  }
  selectionChangeL2(event: any): void {
    const compareObj = { buildings: this.selectedBuildings, sites: this.priority.value };
    if (JSON.stringify(this.previousLVal).toLowerCase() === JSON.stringify(compareObj).toLowerCase()) {
      this.showAppyBtn = false;
    } else {
      this.showAppyBtn = true;
    }
  }
  toggleAllSelection() {
    if (this.allSelected) {
      this.select2.options.forEach((item: MatOption) => item.select());
    } else {
      this.select2.options.forEach((item: MatOption) => item.deselect());
    }
  }
  filterClick(): void {
    this.showAppyBtn = false;
    const objValue = { buildings: this.selectedBuildings, sites: this.priority.value };
    this.previousLVal = objValue;
    this.applyFilter.emit({ L1val: this.selectedBuildings, L2val: this.priority.value });
  }
}
