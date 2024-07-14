import { Component } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { ModalComponent } from './modal/modal.component';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IStatus } from '../../interfaces/istatus';
import { StatusService } from '../../services/status.service';

@Component({
  selector: 'app-states',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ModalComponent,
    ToastModule,
    CardModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './states.component.html',
  styleUrl: './states.component.scss',
})
export class StatesComponent {
  visible = false;
  isNew = false;
  state: IStatus = {
    id: 0,
    name: '',
    isActive: true,
    lastUpdate: new Date().toISOString(),
  };
  states: IStatus[] = [];

  constructor(
    private messageService: MessageService,
    private statusService: StatusService
  ) {}

  ngOnInit(): void {
    this.getStates();
  }

  private getStates() {
    this.statusService.getStates().subscribe({
      next: (data) => (this.states = data.data),
      error: (e) => console.error(e),
    });
  }

  public showForm(status: IStatus) {
    this.state = { ...status };
    this.isNew = false;
    this.visible = true;
  }

  public addStatus() {
    this.state = {
      id: 0,
      name: '',
      isActive: true,
      lastUpdate: new Date().toISOString(),
    };
    this.isNew = true;
    this.visible = true;
  }

  public editStatus(status: IStatus) {
    if (this.isNew) {
      this.statusService.postStatus(status).subscribe({
        next: (r) => {
          if (r.success) {
            this.states.push(r.data);
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Estado agregado',
              detail: 'El estado se ha registrado exitosamente',
            });
          } else
            this.messageService.add({
              severity: 'error',
              summary: r.message,
              detail: 'El estado ya fue registrado',
            });
        },
        error: (e) => console.error(e),
      });
    } else {
      this.statusService.putStatus(status).subscribe({
        next: (r) => {
          if (r.success) {
            let index = this.states.findIndex((c) => c.id == status.id);
            this.states[index] = { ...status };
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Estado Actualizado',
              detail: 'El estado se ha actualizado exitosamente',
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
}
