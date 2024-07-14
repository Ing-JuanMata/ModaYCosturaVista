import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { IMaterial } from '../../interfaces/imaterial';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MaterialService } from '../../services/material.service';
import { ModalComponent } from './modal/modal.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [
    HeaderComponent,
    ToastModule,
    ModalComponent,
    ButtonModule,
    CardModule,
    CommonModule,
  ],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.scss',
  providers: [MessageService],
})
export class MaterialsComponent implements OnInit {
  public visible = false;
  private isNew = false;
  public material: IMaterial = {
    id: 0,
    name: '',
    isActive: true,
    lastUpdate: new Date().toISOString(),
    unit: {
      id: 0,
      name: '',
      shortName: '',
      isActive: true,
      lastUpdate: new Date().toISOString(),
    },
  };
  public materials: Array<IMaterial> = [];

  constructor(
    private messageService: MessageService,
    private materialService: MaterialService
  ) {}

  ngOnInit(): void {
    this.getMaterials();
  }

  private getMaterials() {
    this.materialService.getMaterials().subscribe({
      next: (data) => (this.materials = data.data),
      error: (e) => console.error(e),
    });
  }

  public showForm(material: IMaterial) {
    this.material = { ...material };
    this.isNew = false;
    this.visible = true;
  }

  public addMaterial() {
    this.material = {
      id: 0,
      name: '',
      isActive: true,
      lastUpdate: new Date().toISOString(),
      unit: {
        id: 0,
        name: '',
        shortName: '',
        isActive: true,
        lastUpdate: new Date().toISOString(),
      },
    };
    this.isNew = true;
    this.visible = true;
  }

  public editMaterial(material: IMaterial) {
    if (this.isNew) {
      this.materialService.postMaterial(material).subscribe({
        next: (r) => {
          if (r.success) {
            this.materials.push(r.data);
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Material agregado',
              detail: 'El material se ha registrado exitosamente',
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
      this.materialService.putMaterial(material).subscribe({
        next: (r) => {
          if (r.success) {
            let index = this.materials.findIndex((c) => c.id == material.id);
            this.materials[index] = { ...material };
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Material Actualizado',
              detail: 'El material se ha actualizado exitosamente',
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
