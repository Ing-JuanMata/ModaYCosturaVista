import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { IClient } from '../interfaces/iclient';
import { IResponse } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  getClient(phone: string) {
    return this.httpClient.get<IResponse<IClient>>(
      `${environment.api}Client/GetClient/${phone}`
    );
  }
}
