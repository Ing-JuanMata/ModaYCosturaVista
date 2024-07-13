import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../interfaces/iresponse';
import { ILocalization } from '../interfaces/ilocalization';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private httpClient: HttpClient) {}

  getLocalizations() {
    return this.httpClient.get<IResponse<ILocalization[]>>(
      `${environment.api}Localization/GetAll`
    );
  }

  postLocalization(status: ILocalization) {
    return this.httpClient.post<IResponse<ILocalization>>(
      `${environment.api}Localization/Add`,
      status
    );
  }

  putLocalization(status: ILocalization) {
    return this.httpClient.put<IResponse<ILocalization>>(
      `${environment.api}Localization/Update`,
      status
    );
  }
}
