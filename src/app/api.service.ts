import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiSet } from './api-set';
import {AppSettings} from './data/constants/app-settings';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = ApiSet.settings.appUrl;
  public dashboard_url = AppSettings.settings.dashboard_url;
  constructor(private httpClient: HttpClient) {}

  public getNews(): any {
    return this.httpClient.get(this.url);
  }
  getDashboardData(firstParam: any, requestBody: any): Observable<any[]> {
    return this.httpClient.post<any[]>(this.dashboard_url + '/api/PsimDashboard/GetFullDashboardData?L1val=' + firstParam, requestBody);
  }
  getSiteDdlData(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.dashboard_url + '/api/PsimDashboard/GetSiteDdlData');
  }
}
