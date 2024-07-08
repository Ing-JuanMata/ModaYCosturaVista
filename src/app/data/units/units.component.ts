import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-units',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './units.component.html',
  styleUrl: './units.component.scss',
})
export class UnitsComponent {}
