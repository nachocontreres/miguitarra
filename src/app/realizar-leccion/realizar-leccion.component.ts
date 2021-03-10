import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";


@Component({
  selector: 'app-realizar-leccion',
  templateUrl: './realizar-leccion.component.html',
  styleUrls: ['./realizar-leccion.component.css']
})
export class RealizarLeccionComponent implements OnInit {

  registered = false;
	submitted = false;
  leccionForm: FormGroup;
  serviceErrors:any = {};
  

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router)
  {
  	
  }

  tituloInvalido()
  {
  	return (this.submitted && (this.serviceErrors.titulo != null || this.leccionForm.controls.titulo.errors != null));
  }

  descripcionInvalida()
  {
  	return (this.submitted && (this.serviceErrors.descripcion != null || this.leccionForm.controls.descripcion.errors != null));
  }

  urlInvalida()
  {
  	return (this.submitted && (this.serviceErrors.url != null || this.leccionForm.controls.url.errors != null));
  }

  urlTablaturaInvalida()
  {
  	return (this.submitted && (this.serviceErrors.urlTablatura != null || this.leccionForm.controls.urlTablatura.errors != null));
  }

  dificultadInvalida()
  {
  	return (this.submitted && (this.serviceErrors.dificultad != null || this.leccionForm.controls.dificultad.errors != null));
  }

  ngOnInit()
  {
  	this.leccionForm = this.formBuilder.group({
      titulo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(35)]],
      descripcion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]],
      url: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200), Validators.pattern("^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$")]],
      urlTablatura: ['', [Validators.minLength(5), Validators.maxLength(200), Validators.pattern("[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?")]],
  		dificultad: ['', Validators.required],
  	});
  }

  get leccionFormControl() {
    return this.leccionForm.controls;
  }

  onSubmit()
  {
  	this.submitted = true;
    
  	if(this.leccionForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
  		let data: any = Object.assign(this.leccionForm.value);

  		this.http.post('/api/v1/leccion', data).subscribe((data:any) => {
	      
	      let path = '/leccion/' + data.leccion.lid;

	      this.router.navigate([path]);
	    }, error =>
	    {
	    	this.serviceErrors = error.error.error;
        });

  		this.registered = true;

  	}
  }
 
  niveles = ['Principiante', 'Intermedio',
            'Avanzado'];

};