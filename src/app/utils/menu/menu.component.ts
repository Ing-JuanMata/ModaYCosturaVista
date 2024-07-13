import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarModule,
    ButtonModule,
    CommonModule,
    RouterModule,
    PanelMenuModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements OnInit {
  sidebarVisible = false;
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [
      {
        label: 'Funciones Principales',
        icon: PrimeIcons.STAR,
        items: [
          {
            label: 'Clientes',
            routerLink: '/main/clients',
            icon: PrimeIcons.USERS,
            routerLinkActiveOptions: { exact: true },
            command: () => (this.sidebarVisible = false),
          },
        ],
      },
      {
        label: 'Catalogos de datos',
        icon: PrimeIcons.BOOK,
        items: [
          {
            label: 'Materiales',
            routerLink: '/data/materials',
            icon: PrimeIcons.BRIEFCASE,
            command: () => (this.sidebarVisible = false),
          },
          {
            label: 'Locaciones',
            routerLink: '/data/localization',
            icon: PrimeIcons.MAP_MARKER,
            command: () => (this.sidebarVisible = false),
          },
          {
            label: 'Propiedades',
            routerLink: '/data/properties',
            icon: PrimeIcons.BOOK,
            command: () => (this.sidebarVisible = false),
          },
          {
            label: 'Estados',
            routerLink: '/data/states',
            icon: PrimeIcons.CHECK_CIRCLE,
            command: () => (this.sidebarVisible = false),
          },
          {
            label: 'Tipos',
            routerLink: '/data/types',
            icon: PrimeIcons.BOOK,
            command: () => (this.sidebarVisible = false),
          },
          {
            label: 'Unidades',
            routerLink: '/data/units',
            icon: PrimeIcons.CALCULATOR,
            command: () => (this.sidebarVisible = false),
          },
        ],
      },
    ];
  }
}
