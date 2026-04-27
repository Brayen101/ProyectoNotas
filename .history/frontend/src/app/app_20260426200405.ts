import { Component } from '@angular/core';
import { RegistroComponent } from './componentes/registro/registro';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RegistroComponent],
  template: '<app-registro></app-registro>'
})
export class App {
}