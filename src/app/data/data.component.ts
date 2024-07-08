import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-data',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
})
export class DataComponent {}
