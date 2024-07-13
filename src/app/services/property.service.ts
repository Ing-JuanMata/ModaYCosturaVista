import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../interfaces/iresponse';
import { IProperty } from '../interfaces/iproperty';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private httpClient: HttpClient) {}

  getProperties() {
    return this.httpClient.get<IResponse<IProperty[]>>(
      `${environment.api}Property/GetAll`
    );
  }

  postProperty(status: IProperty) {
    return this.httpClient.post<IResponse<IProperty>>(
      `${environment.api}Property/Add`,
      status
    );
  }

  putProperty(status: IProperty) {
    return this.httpClient.put<IResponse<IProperty>>(
      `${environment.api}Property/Update`,
      status
    );
  }
}
