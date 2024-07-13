import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IStatus } from '../../../interfaces/istatus';

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
  @Input({ required: true }) state: IStatus = { id: 0, name: '' };
  @Output('editStatus') editStatusEvent: EventEmitter<IStatus> = new EventEmitter();
  @Output('visibleEvent') visibleEvent: EventEmitter<boolean> =
    new EventEmitter();

  constructor() {}

  public editStatus() {
    this.editStatusEvent.emit(this.state);
  }

  public setHidden() {
    this.visibleEvent.emit(false);
  }
}
