import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { IProperty } from '../../interfaces/iproperty';
import { PropertyService } from '../../services/property.service';
import { HeaderComponent } from '../../utils/header/header.component';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    CardModule,
    ButtonModule,
    ToastModule,
    ModalComponent,
  ],
  providers: [MessageService],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss',
})
export class PropertiesComponent {
  visible = false;
  isNew = false;
  property: IProperty = { id: 0, name: '' };
  properties: IProperty[] = [];

  constructor(
    private messageService: MessageService,
    private propertyService: PropertyService
  ) {}

  ngOnInit(): void {
    this.getProperties();
  }

  private getProperties() {
    this.propertyService.getProperties().subscribe({
      next: (data) => (this.properties = data.data),
      error: (e) => console.error(e),
    });
  }

  public showForm(status: IProperty) {
    this.property = { ...status };
    this.isNew = false;
    this.visible = true;
  }

  public addProperty() {
    this.property = { id: 0, name: '' };
    this.isNew = true;
    this.visible = true;
  }

  public editProperty(property: IProperty) {
    if (this.isNew) {
      this.propertyService.postProperty(property).subscribe({
        next: (r) => {
          if (r.success) {
            this.properties.push(r.data);
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Propiedad agregada',
              detail: 'La propiedad se ha registrado exitosamente',
            });
          } else
            this.messageService.add({
              severity: 'error',
              summary: r.message,
              detail: 'La propiedad ya fue registrada',
            });
        },
        error: (e) => console.error(e),
      });
    } else {
      this.propertyService.putProperty(property).subscribe({
        next: (r) => {
          if (r.success) {
            let index = this.properties.findIndex((c) => c.id == property.id);
            this.properties[index] = { ...property };
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Propiedad Actualizada',
              detail: 'La propiedad se ha actualizado exitosamente',
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
