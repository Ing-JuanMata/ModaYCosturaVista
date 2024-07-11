import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStatus } from '../interfaces/istatus';
import { IResponse } from '../interfaces/iresponse';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient) {}

  getStates() {
    return this.httpClient.get<IResponse<IStatus[]>>(
      `${environment.api}Status/GetAll`
    );
  }

  postStatus(status: IStatus) {
    return this.httpClient.post<IResponse<IStatus>>(
      `${environment.api}Status/Add`,
      status
    );
  }

  putStatus(status: IStatus) {
    return this.httpClient.put<IResponse<IStatus>>(
      `${environment.api}Status/Update`,
      status
    );
  }
}
