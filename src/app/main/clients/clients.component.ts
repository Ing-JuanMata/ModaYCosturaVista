import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { IClient } from '../../interfaces/iclient';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    ToolbarModule,
    SplitButtonModule,
    CardModule,
    CommonModule,
    ModalComponent,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
})
export class ClientsComponent {
  public visible = false;
  public client: IClient = {
    id: 0,
    isAdmin: false,
    lastName: '',
    name: '',
    phone: '',
  };
  public clients: Array<IClient> = [
    {
      id: 1,
      isAdmin: false,
      lastName: 'Mata',
      name: 'Juan',
      phone: '3117462453',
      jobs: 2,
    },
    {
      id: 2,
      isAdmin: false,
      lastName: 'Mata',
      name: 'Juan',
      phone: '3117462453',
    },
    {
      id: 3,
      isAdmin: false,
      lastName: 'Mata',
      name: 'Juan',
      phone: '3117462453',
      jobs: 1,
    },
    {
      id: 4,
      isAdmin: false,
      lastName: 'Mata',
      name: 'Juan',
      phone: '3117462453',
      jobs: 1,
    },
  ];

  constructor() {}

  public showForm(client: IClient) {
    this.client = { ...client };
    this.visible = true;
  }

  public editClient(client: IClient) {
    let index = this.clients.findIndex((c) => c.id == client.id);
    this.clients[index] = { ...client };
    this.visible = false;
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
  }
}
