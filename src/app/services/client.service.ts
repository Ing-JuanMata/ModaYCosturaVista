import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IClient } from '../interfaces/iclient';
import { IResponse } from '../interfaces/iresponse';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private httpClient: HttpClient) {}

  clientExists(phone: string) {
    return this.httpClient.get<IResponse<IClient>>(
      `${environment.api}Client/Exists/${phone}`
    );
  }

  getClients() {
    return this.httpClient.get<IResponse<IClient[]>>(
      `${environment.api}Client/GetAll`
    );
  }

  postClient(client: IClient) {
    return this.httpClient.post<IResponse<IClient>>(
      `${environment.api}Client/Add`,
      client
    );
  }

  putClient(client: IClient) {
    return this.httpClient.put<IResponse<IClient>>(
      `${environment.api}Client/Update`,
      client
    );
  }
}
