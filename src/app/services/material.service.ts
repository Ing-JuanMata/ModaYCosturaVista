import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../interfaces/iresponse';
import { IClient } from '../interfaces/iclient';
import { environment } from '../../environments/environment';
import { IMaterial } from '../interfaces/imaterial';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  constructor(private httpClient: HttpClient) {}

  getMaterials() {
    return this.httpClient.get<IResponse<IMaterial[]>>(
      `${environment.api}Material/GetAll`
    );
  }

  postMaterial(material: IMaterial) {
    return this.httpClient.post<IResponse<IMaterial>>(
      `${environment.api}Material/Add`,
      material
    );
  }

  putMaterial(material: IMaterial) {
    return this.httpClient.put<IResponse<IMaterial>>(
      `${environment.api}Material/Update`,
      material
    );
  }
}
