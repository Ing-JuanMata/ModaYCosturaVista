import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { IClient } from '../../interfaces/iclient';
import { ClientService } from '../../services/client.service';
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
    ToastModule,
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  providers: [MessageService],
})
export class ClientsComponent implements OnInit {
  public visible = false;
  private isNew = false;
  public client: IClient;
  public clients: Array<IClient> = [];

  constructor(
    private clientService: ClientService,
    private messageService: MessageService
  ) {
    this.client = {
      id: 0,
      isAdmin: false,
      lastName: '',
      name: '',
      phone: '',
    };
  }

  ngOnInit(): void {
    this.getClients();
  }

  private getClients() {
    this.clientService.getClients().subscribe({
      next: (data) => (this.clients = data.data),
      error: (e) => console.error(e),
    });
  }

  public showForm(client: IClient) {
    this.client = { ...client };
    this.isNew = false;
    this.visible = true;
  }

  public addClient() {
    this.client = {
      id: 0,
      isAdmin: false,
      lastName: '',
      name: '',
      phone: '',
    };
    this.isNew = true;
    this.visible = true;
  }

  public editClient(client: IClient) {
    if (this.isNew) {
      this.clientService.postClient(client).subscribe({
        next: (r) => {
          if (r.success) {
            this.clients.push(r.data);
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Cliente agregado',
              detail: 'El cliente se ha registrado exitosamente',
            });
          } else
            this.messageService.add({
              severity: 'error',
              summary: r.message,
              detail: 'El telefono ya fue registrado',
            });
        },
        error: (e) => console.error(e),
      });
    } else {
      this.clientService.putClient(client).subscribe({
        next: (r) => {
          if (r.success) {
            let index = this.clients.findIndex((c) => c.id == client.id);
            this.clients[index] = { ...client };
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Cliente Actualizado',
              detail: 'El cliente se ha actualizado exitosamente',
            });
          } else
            this.messageService.add({
              severity: 'error',
              summary: 'error',
              detail: r.message,
            });
        },
        error: (e) => console.error(e),
      });
    }
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
  }

  public sendMessage(client: IClient) {
    window.open(`//wa.me/${client.phone}`, '_blank');
  }
}
