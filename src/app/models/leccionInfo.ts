export class LeccionInfoModel
{
	titulo: string;
	descripcion: string;
	url: string;
	urlTablatura: string;
	dificultad: string;
	
	constructor(obj: any = null)
	{
		if(obj != null)
		{
			Object.assign(this, obj);
		}
	}
}