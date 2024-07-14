import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IMaterial } from '../../../interfaces/imaterial';
import { IUnit } from '../../../interfaces/iunits';
import { UnitService } from '../../../services/unit.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    DialogModule,
    InputTextModule,
    InputMaskModule,
    FormsModule,
    SplitButtonModule,
    DropdownModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent implements OnInit {
  @Input() visible = false;
  @Input({ required: true }) material: IMaterial = {
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
  @Output('editMaterial') editMaterialEvent: EventEmitter<IMaterial> =
    new EventEmitter();
  @Output('visibleEvent') visibleEvent: EventEmitter<boolean> =
    new EventEmitter();
  units: IUnit[] = [];

  constructor(private unitService: UnitService) {}

  ngOnInit(): void {
    this.unitService.getUnits().subscribe({
      next: (d) => (this.units = d.data),
      error: (e) => console.error(e),
    });
  }

  public editMaterial() {
    this.editMaterialEvent.emit(this.material);
  }

  public setHidden() {
    this.visibleEvent.emit(false);
  }
}
