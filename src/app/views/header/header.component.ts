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
  @ViewChild('select1', { static: false }) select1: MatSelect;
  @ViewChild('select2', { static: false }) select2: MatSelect;
  @Output() applyFilter: any = new EventEmitter();
  allSelected = true;
  constructor(public apiService: ApiService) { }

  ngOnInit(): void {
    this.buildings.setValue('ALL');
    this.apiService.getSiteDdlData().subscribe((response: any) => {
      this.getSiteDdlData = response;
      for (const value of this.getSiteDdlData) {
        this.buildingList.push(value.type);
      }
      this.buildingList.unshift('ALL');
    });
  }
  selectionChange(event: any): void {
    this.priorityList = [];
    const siteObject = this.getSiteDdlData.find(data => data.type === event.value);
    if (siteObject) {
      for (const value of siteObject.lstSites) {
        this.priorityList.push(value);
      }
      this.priority.setValue(this.priorityList);
      this.allSelected = true;
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
    this.applyFilter.emit({L1val: this.selectedBuildings, L2val: this.priority.value});
  }
}