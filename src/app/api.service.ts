import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiSet } from './api-set';

@Injectable({
  providedIn: "root",
})
export class ApiService {
  url: string = ApiSet.settings.appUrl;

  constructor(private httpClient: HttpClient) {}

  public getNews(): any {
    return this.httpClient.get(this.url);
  }
}
