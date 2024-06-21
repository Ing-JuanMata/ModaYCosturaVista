import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IClient } from '../../../interfaces/iclient';

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
  @Input({ required: true }) client: IClient = {
    id: 0,
    isAdmin: false,
    lastName: '',
    name: '',
    phone: '',
  };
  @Output('editClient') editClientEvent: EventEmitter<IClient> =
    new EventEmitter();
  @Output('visibleEvent') visibleEvent: EventEmitter<boolean> =
    new EventEmitter();

  constructor() {
    console.log(this.visible);
  }

  public editClient() {
    this.editClientEvent.emit(this.client);
  }

  public setHidden() {
    this.visibleEvent.emit(false);
  }
}
