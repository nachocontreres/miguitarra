import { Component, OnInit } from '@angular/core';
import {LeccionInfoModel} from '../models/leccionInfo';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'visualizar-leccion',
  templateUrl: './visualizar-leccion.component.html',
  styleUrls: ['./visualizar-leccion.component.css']
})

export class VisualizarLeccionComponent implements OnInit
{

	leccion: LeccionInfoModel = new LeccionInfoModel({ 
		lid: "cust2dsa12dsa", 
		titulo: "Titulo de prueba", 
		url: "Url de prueba", 
		urlTablatura: "Url de prueba", 
		dificultad: "Difucultad de prueba"
	});
	
	embedUrl: string;
	sanitizer: any;
	mensajeError: string;
	hayError: boolean = false;
	
	constructor(private http: HttpClient, private route: ActivatedRoute, private _sanitizer: DomSanitizer) {
		this.sanitizer = _sanitizer;
	}

	private subscriber: any;

	ngOnInit()
	{
		this.subscriber = this.route.params.subscribe(params => {
	       this.http.get('/api/v1/leccion/' + params.lid).subscribe((data:any) => {
				this.leccion = new LeccionInfoModel(data.leccion);
				var codigo = this.obtenerParametroPorNombre(this.leccion.url, 'v');
				var url =  "https://www.youtube.com/embed/"+codigo;
				this.embedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
		    }, error => this.handleError(error));
		});
		
	}

	obtenerParametroPorNombre(url, nombre) {
		nombre = nombre.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + nombre + "=([^&#]*)"),
		  results = regex.exec(url);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	private handleError(error: HttpErrorResponse) {
		this.hayError = true;
		if (error.error instanceof ErrorEvent) {
		  // A client-side or network error occurred. Handle it accordingly.
		  console.error('Ocurrio un error:', error.error.message);
		} else {
		  // The backend returned an unsuccessful response code.
		  // The response body may contain clues as to what went wrong.
		  console.error(
			`Backend returned code ${error.status}, ` +
			`body was: ${error.error}`);
		}
		// Return an observable with a user-facing error message.
		this.mensajeError = 'Hubo un error al cargar la lección solicitada. Posiblemente el id ingresado no es correcto. Verifiquelo e intente nuevamente.';
	  }
}