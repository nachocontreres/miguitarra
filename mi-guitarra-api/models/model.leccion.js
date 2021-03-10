class LeccionModel
{
	constructor(titulo, descripcion, url, urlTablatura, dificultad)
	{
		this.titulo = titulo;
		this.descripcion = descripcion;
		this.url = url;
		this.urlTablatura = urlTablatura;
		this.dificultad = dificultad;
		this.lid = null;
	}
}

module.exports = LeccionModel;