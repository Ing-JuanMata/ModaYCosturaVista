import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IProperty } from '../../../interfaces/iproperty';

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
  @Input({ required: true }) property: IProperty = { id: 0, name: '' };
  @Output('editProperty') editPropertyEvent: EventEmitter<IProperty> =
    new EventEmitter();
  @Output('visibleEvent') visibleEvent: EventEmitter<boolean> =
    new EventEmitter();

  constructor() {}

  public editProperty() {
    this.editPropertyEvent.emit(this.property);
  }

  public setHidden() {
    this.visibleEvent.emit(false);
  }
}
