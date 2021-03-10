import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-ver-leccion',
  templateUrl: './ver-leccion.component.html',
  styleUrls: ['./ver-leccion.component.css']
})

export class VerLeccionComponent implements OnInit
{

	lecciones: any = [];

	constructor(private http: HttpClient, private route: ActivatedRoute) {

	}

	private subscriber: any;

	ngOnInit()
	{
		this.subscriber = this.route.params.subscribe(params => {
	       this.http.get('/api/v1/lecciones').subscribe((data:any) => {
			   for (let i in data) {
				for (let j in data[i]) {
					this.lecciones.push(data[i][j])
				  }
				}
		    });
	    });
	}
	obtenerUrlImagen(url) {
		var thumb = this.obtenerParametroPorNombre(url, 'v');
		var urlImg = 'http://img.youtube.com/vi/' + thumb + '/mqdefault.jpg';
		return urlImg;
	}

	obtenerParametroPorNombre(url, nombre) {
		nombre = nombre.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
		var regex = new RegExp("[\\?&]" + nombre + "=([^&#]*)"),
		  results = regex.exec(url);
		return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}
	
	badgeDificultad(dificultad){
		var tipo;
		switch(dificultad) {
			case "Principiante":
			  tipo = "badge-success";
			  break;
			case "Intermedio":
				tipo = "badge-warning";
				break;
			case "Avanzado":
			  tipo = "badge-danger";
			  break;
			default:
				tipo = "badge-secondary";
				break;
		  }
		  return tipo;
	}

	mostrarLeccion(dificultad){
		switch(dificultad) {
			case "Principiante":
			  return this.principiante;
			case "Intermedio":
				return this.intermedio;
			case "Avanzado":
			  return this.avanzado;
			default:
				return true;
		  }
	}

	principiante = true;
	intermedio = true;
	avanzado = true;
}
