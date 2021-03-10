import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RealizarLeccionComponent } from './realizar-leccion/realizar-leccion.component';
import { VerLeccionComponent } from './ver-leccion/ver-leccion.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { VisualizarLeccionComponent } from './visualizar-leccion/visualizar-leccion.component';

@NgModule({
  declarations: [
    AppComponent,
    RealizarLeccionComponent,
    VerLeccionComponent,
    BienvenidaComponent,
    VisualizarLeccionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
