import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { RealizarLeccionComponent } from './realizar-leccion/realizar-leccion.component';
import { VerLeccionComponent } from './ver-leccion/ver-leccion.component';
import { VisualizarLeccionComponent } from './visualizar-leccion/visualizar-leccion.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';

const routes: Routes = [
{ path: 'verListado', component: VerLeccionComponent },
{ path: 'realizarLeccion', component: RealizarLeccionComponent },
{ path: 'leccion/:lid', component: VisualizarLeccionComponent },
{ path: '', component: BienvenidaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
