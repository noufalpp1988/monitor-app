import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from '../header/header.component';
import {MatSelectModule,
MatButtonModule,
MatTableModule,
MatCheckboxModule} from '@angular/material';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@NgModule({
  declarations: [DashboardComponent, HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCheckboxModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ],
  providers: [NgxSpinnerService]
})
export class DashboardModule { }
