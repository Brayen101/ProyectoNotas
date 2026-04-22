import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header';
import { SidebarComponent } from '../sidebar/sidebar';
import { NotasComponent } from '../notas/notas';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent, NotasComponent],
  templateUrl: './principal.html',
  styleUrl: './principal.css'
})
export class PrincipalComponent { }