import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { IType } from '../../interfaces/itype';
import { TypeService } from '../../services/type.service';
import { HeaderComponent } from '../../utils/header/header.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-types',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    ModalComponent,
    CardModule,
    ButtonModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './types.component.html',
  styleUrl: './types.component.scss',
})
export class TypesComponent {
  visible = false;
  isNew = false;
  type: IType = {
    id: 0,
    name: '',
    isActive: true,
    lastUpdate: new Date().toISOString(),
  };
  types: IType[] = [];

  constructor(
    private messageService: MessageService,
    private typeService: TypeService
  ) {}

  ngOnInit(): void {
    this.getTypes();
  }

  private getTypes() {
    this.typeService.getTypes().subscribe({
      next: (data) => (this.types = data.data),
      error: (e) => console.error(e),
    });
  }

  public showForm(type: IType) {
    this.type = { ...type };
    this.isNew = false;
    this.visible = true;
  }

  public addType() {
    this.type = {
      id: 0,
      name: '',
      isActive: true,
      lastUpdate: new Date().toISOString(),
    };
    this.isNew = true;
    this.visible = true;
  }

  public editType(type: IType) {
    if (this.isNew) {
      this.typeService.postType(type).subscribe({
        next: (r) => {
          if (r.success) {
            this.types.push(r.data);
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Tipo agregado',
              detail: 'El tipo se ha registrado exitosamente',
            });
          } else
            this.messageService.add({
              severity: 'error',
              summary: r.message,
              detail: 'El tipo ya fue registrado',
            });
        },
        error: (e) => console.error(e),
      });
    } else {
      this.typeService.putType(type).subscribe({
        next: (r) => {
          if (r.success) {
            let index = this.types.findIndex((c) => c.id == type.id);
            this.types[index] = { ...type };
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Tipo Actualizado',
              detail: 'El tipo se ha actualizado exitosamente',
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
