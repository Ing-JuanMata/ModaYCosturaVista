import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../interfaces/iresponse';
import { IUnit } from '../interfaces/iunits';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UnitService {
  constructor(private httpClient: HttpClient) {}

  getUnits() {
    return this.httpClient.get<IResponse<IUnit[]>>(
      `${environment.api}Unit/GetAll`
    );
  }

  postUnit(unit: IUnit) {
    return this.httpClient.post<IResponse<IUnit>>(
      `${environment.api}Unit/Add`,
      unit
    );
  }

  putUnit(unit: IUnit) {
    return this.httpClient.put<IResponse<IUnit>>(
      `${environment.api}Unit/Update`,
      unit
    );
  }
}
