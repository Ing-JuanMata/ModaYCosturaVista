import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IUnit } from '../../../interfaces/iunits';

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
  @Input({ required: true }) unit: IUnit = { id: 0, name: '', shortName: '' };
  @Output('editUnit') editUnitEvent: EventEmitter<IUnit> = new EventEmitter();
  @Output('visibleEvent') visibleEvent: EventEmitter<boolean> =
    new EventEmitter();

  constructor() {}

  public editUnit() {
    this.editUnitEvent.emit(this.unit);
  }

  public setHidden() {
    this.visibleEvent.emit(false);
  }
}
