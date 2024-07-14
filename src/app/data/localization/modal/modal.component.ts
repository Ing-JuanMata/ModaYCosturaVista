import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { IStatus } from '../../../interfaces/istatus';
import { ILocalization } from '../../../interfaces/ilocalization';

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
  @Input({ required: true }) localization: ILocalization = {
    id: 0,
    name: '',
    isActive: true,
    lastUpdate: new Date().toISOString(),
  };
  @Output('editLocalization') editLocalizationEvent: EventEmitter<ILocalization> = new EventEmitter();
  @Output('visibleEvent') visibleEvent: EventEmitter<boolean> =
    new EventEmitter();

  constructor() {}

  public editLocalization() {
    this.editLocalizationEvent.emit(this.localization);
  }

  public setHidden() {
    this.visibleEvent.emit(false);
  }
}
