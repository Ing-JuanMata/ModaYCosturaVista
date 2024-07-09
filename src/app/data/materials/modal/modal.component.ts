import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IMaterial } from '../../../interfaces/imaterial';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    DialogModule,
    InputTextModule,
    InputMaskModule,
    FormsModule,
    SplitButtonModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() visible = false;
  @Input({ required: true }) material: IMaterial = { id: 0, name: '' };
  @Output('editMaterial') editMaterialEvent: EventEmitter<IMaterial> =
    new EventEmitter();
  @Output('visibleEvent') visibleEvent: EventEmitter<boolean> =
    new EventEmitter();

  constructor() {}

  public editMaterial() {
    this.editMaterialEvent.emit(this.material);
  }

  public setHidden() {
    this.visibleEvent.emit(false);
  }
}
