import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { HeaderComponent } from '../../utils/header/header.component';
import { ModalComponent } from './modal/modal.component';
import { ILocalization } from '../../interfaces/ilocalization';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-localization',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    CardModule,
    ButtonModule,
    ModalComponent,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './localization.component.html',
  styleUrl: './localization.component.scss',
})
export class LocalizationComponent implements OnInit {
  visible = false;
  isNew = false;
  localization: ILocalization = {
    id: 0,
    name: '',
    isActive: true,
    lastUpdate: new Date().toISOString(),
  };
  localizations: ILocalization[] = [];

  constructor(
    private messageService: MessageService,
    private localizationService: LocalizationService
  ) {}

  ngOnInit(): void {
    this.getLocalizations();
  }

  private getLocalizations() {
    this.localizationService.getLocalizations().subscribe({
      next: (data) => (this.localizations = data.data),
      error: (e) => console.error(e),
    });
  }

  public showForm(localization: ILocalization) {
    this.localization = { ...localization };
    this.isNew = false;
    this.visible = true;
  }

  public addLocalization() {
    this.localization = {
      id: 0,
      name: '',
      isActive: true,
      lastUpdate: new Date().toISOString(),
    };
    this.isNew = true;
    this.visible = true;
  }

  public editLocalization(localization: ILocalization) {
    if (this.isNew) {
      this.localizationService.postLocalization(localization).subscribe({
        next: (r) => {
          if (r.success) {
            this.localizations.push(r.data);
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Locación agregada',
              detail: 'La locación se ha registrado exitosamente',
            });
          } else
            this.messageService.add({
              severity: 'error',
              summary: r.message,
              detail: 'La locación ya fue registrada',
            });
        },
        error: (e) => console.error(e),
      });
    } else {
      this.localizationService.putLocalization(localization).subscribe({
        next: (r) => {
          if (r.success) {
            let index = this.localizations.findIndex((c) => c.id == localization.id);
            this.localizations[index] = { ...localization };
            this.visible = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Locación Actualizado',
              detail: 'La locación se ha actualizado exitosamente',
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
