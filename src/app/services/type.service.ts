import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IResponse } from '../interfaces/iresponse';
import { IType } from '../interfaces/itype';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private httpClient: HttpClient) {}

  getTypes() {
    return this.httpClient.get<IResponse<IType[]>>(
      `${environment.api}Type/GetAll`
    );
  }

  postType(type: IType) {
    return this.httpClient.post<IResponse<IType>>(
      `${environment.api}Type/Add`,
      type
    );
  }

  putType(type: IType) {
    return this.httpClient.put<IResponse<IType>>(
      `${environment.api}Type/Update`,
      type
    );
  }
}
