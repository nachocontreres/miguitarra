const LeccionModel = require("../models/model.leccion");
let Validator = require('fastest-validator');


let lecciones = {};
let counter = 0;

//Creo las lecciones pre cargadas
let leccion = new LeccionModel("Lección 1", "La guitarra, posición y ejercicios", "https://www.youtube.com/watch?v=PqN-rlV6Tp4", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Principiante");
leccion.lid = 'l' + counter++;
lecciones[leccion.lid] = leccion;
leccion = new LeccionModel("Lección 2", "Cambio de cuerdas, afinación y acordes", "https://www.youtube.com/watch?v=PDLKmXJA2yk", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf","Principiante");
leccion.lid = 'l' + counter++;
lecciones[leccion.lid] = leccion;
leccion = new LeccionModel("Lección 3", "Ritmos y rasgueos para guitarra", "https://www.youtube.com/watch?v=Mtj17mkK_tk", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf","Principiante");
leccion.lid = 'l' + counter++;
lecciones[leccion.lid] = leccion;
leccion = new LeccionModel("Lección 4", "Acordes menores y cambios de acordes", "https://www.youtube.com/watch?v=igipWVKfUUI", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf","Principiante");
leccion.lid = 'l' + counter++;
lecciones[leccion.lid] = leccion;
leccion = new LeccionModel("Lección 5", "Los círculos armónicos", "https://www.youtube.com/watch?v=upnVTgOVlCE","https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Principiante");
leccion.lid = 'l' + counter++;
lecciones[leccion.lid] = leccion;
leccion = new LeccionModel("When it's love - Van Halen", "Fingerpicking arreglo para guitarra", "https://www.youtube.com/watch?v=u1F0ZkaGJx8","https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Intermedio");
leccion.lid = 'l' + counter++;
lecciones[leccion.lid] = leccion;
leccion = new LeccionModel("The Flame - Cheap Trick", "Arreglo en Fingerpicking para guitarra", "https://www.youtube.com/watch?v=nvprby9GdSw","https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Intermedio");
leccion.lid = 'l' + counter++;
lecciones[leccion.lid] = leccion;
leccion = new LeccionModel("Los dinosaurios - Charly García", "Como tocarla en guitarra", "https://www.youtube.com/watch?v=2onPLMWQ6dY","https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf", "Avanzado");
leccion.lid = 'l' + counter++;
lecciones[leccion.lid] = leccion;
leccion = new LeccionModel("Como rearmonizar", "Como rearmonizar usando una cadena de dominantes o dominantes por extensión", "https://www.youtube.com/watch?v=lAQARqRWGg4", "https://www.docdroid.net/bVwtuqS/hans-zimmer-time-fingerstyle-guitar-pdf","Avanzado");
leccion.lid = 'l' + counter++;
lecciones[leccion.lid] = leccion;

let leccionValidator = new Validator();

let stringPattern = /([A-Za-z\-\’])*/;
const leccionVSchema = {
		titulo: { type: "string", min: 5, max: 35, 
		messages: {
			stringMin: "El título es demasiado corto",
			stringMax: "El largo del título no puede superar los 35 caracteres."
        },
		pattern: stringPattern},
		descripcion: { type: "string", min: 5, max: 500, messages: {
			stringMin: "La descripción es demasiado corta",
			stringMax: "El largo de la descripción no puede superar los 500 caracteres."
        }, pattern: stringPattern},
		url: { type: "string", min: 5, max: 200, 
		messages: {
			stringMin: "La url es demasiado corta",
			stringMax: "El largo de la url no puede superar los 200 caracteres."
        },
		pattern: stringPattern},
		urlTablatura: { type: "string", min: 0, max: 300, 
		messages: {
			stringMax: "El largo de la url de la tablatura no puede superar los 300 caracteres."
        },
		pattern: stringPattern},
		dificultad: { type: "string", min: 4, max: 50, 
		messages: {
			stringMin: "La dificultad es demasiado corta",
			stringMax: "El largo de la dificultad no puede superar los 50 caracteres."
        },
		pattern: stringPattern}
	};

class LeccionService
{
	static create(data)
	{
		var vres = leccionValidator.validate(data, leccionVSchema);
		
		if(vres != true)
		{
			let errors = {}, item;

			for(const index in vres)
			{
				item = vres[index];

				errors[item.field] = item.message;
			}
			
			throw {
			    name: "ValidationError",
			    message: errors
			};
		}

		let leccion = new LeccionModel(data.titulo, data.descripcion, data.url, data.urlTablatura, data.dificultad);

		leccion.lid = 'l' + counter++;

		lecciones[leccion.lid] = leccion;

		return leccion;
	}

	static retrieve(lid)
	{
		if(lecciones[lid] != null)
		{
			return lecciones[lid];
		}
		else
		{
			throw new Error('Imposible recuperar la lección (lid:'+ lid +')');
		}
	}

	static todas()
	{
		return lecciones;
	}

}

module.exports = LeccionService;