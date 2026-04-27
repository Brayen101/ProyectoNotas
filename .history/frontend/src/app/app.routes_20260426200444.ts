import { Routes } from '@angular/router';
import { LogiinComponent } from './componentes/logiin/logiin';
import { RegistroComponent } from './componentes/registro/registro';

export const routes: Routes = [
	{ path: '', component: LogiinComponent },
	{ path: 'registro', component: RegistroComponent },
	{ path: '**', redirectTo: '' },
];
