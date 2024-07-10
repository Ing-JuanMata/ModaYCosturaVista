import { Component } from '@angular/core';
import { HeaderComponent } from '../../utils/header/header.component';
import { ButtonModule } from 'primeng/button';
import { ModalComponent } from './modal/modal.component';
import { IUnit } from '../../interfaces/iunits';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UnitService } from '../../services/unit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonModule,
    ModalComponent,
    CardModule,
    ToastModule,
    CommonModule,
  ],
  providers: [MessageService],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss',
})
export class UnitsComponent {
  visible = false;
  isNew = false;
  unit: IUnit = { id: 0, name: '', shortName: '' };
  units: IUnit[] = [];

  constructor(
    private messageService: MessageService,
    private unitService: UnitService
  ) {}

  ngOnInit(): void {
    this.getUnits();
  }

  private getUnits() {
    this.unitService.getUnits().subscribe({
      next: (data) => (this.units = data.data),
      error: (e) => console.error(e),
    });
  }

  public showForm(unit: IUnit) {
    this.unit = { ...unit };
    this.isNew = false;
    this.visible = true;
  }

  public addUnit() {
    this.unit = { id: 0, name: '', shortName: '' };
    this.isNew = true;
    this.visible = true;
  }

  public editUnit(material: IUnit) {
    if (this.isNew) {
      this.unitService.postUnit(material).subscribe({
        next: (r) => {
          if (r.success) {
            this.units.push(r.data);
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Unidad agregada',
              detail: 'La unidad se ha registrado exitosamente',
            });
          } else
            this.messageService.add({
              severity: 'error',
              summary: r.message,
              detail: 'La unidad ya fue registrada',
            });
        },
        error: (e) => console.error(e),
      });
    } else {
      this.unitService.putUnit(material).subscribe({
        next: (r) => {
          if (r.success) {
            let index = this.units.findIndex((c) => c.id == material.id);
            this.units[index] = { ...material };
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Unidad Actualizada',
              detail: 'La unidad se ha actualizado exitosamente',
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
