import { Component, OnInit } from '@angular/core';
import { AceiteModel } from './../../models/aceite.model';
import { NgForm } from '@angular/forms';
import { AceitesService } from './../../services/aceites.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-aceite',
  templateUrl: './aceite.component.html',
  styleUrls: ['./aceite.component.css']
})
export class AceiteComponent implements OnInit {
  paises: string[] = ['Brazil', 'India', 'Australia', 'Morocco', 'Bulgaria'];
  aceite = new AceiteModel();

  constructor(public servicio: AceitesService, private route: ActivatedRoute, private router: Router) {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.servicio
    //   .getInfoAceite(id)
    //   .subscribe((resp: AceiteModel) => {
    //     this.aceite = resp;
    //     console.log(resp);
    //     this.aceite.id = id;
    //   });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.servicio.downloadURL = '';
    this.aceite.urlImagen = '';
    if (id !== 'nuevo') {
      this.servicio
        .getInfoAceite(id)
        .subscribe((resp: AceiteModel) => {
          this.aceite = resp;
          console.log('URL IMAGEN', this.aceite.urlImagen);
          this.servicio.downloadURL = this.aceite.urlImagen;
          this.aceite.id = id;

        });
    }
  }

  guardar(form: NgForm) {

    console.log('Formulario', form);
    // console.log('this.aceite', this.aceite);
    if (form.invalid) {
      console.log('Complete todos los campos');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });

    Swal.showLoading();
    let peticion: Observable<any>;

    if (this.aceite.id) {
      this.servicio.downloadURL = this.aceite.urlImagen;
      peticion = this.servicio.actualizarAceite(this.aceite);
      peticion.subscribe(resp => {
        Swal.fire({
          title: this.aceite.nombre,
          text: 'Se actualizó correctamente',
          type: 'success'
        });
        this.router.navigateByUrl('/aceites');
      });
    } else {
      this.aceite.urlImagen = this.servicio.downloadURL;
      peticion = this.servicio.insertarAceite(this.aceite);
      this.servicio.progreso = 0;
      peticion.subscribe(resp => {
        Swal.fire({
          title: this.aceite.nombre,
          text: 'Se guardó la información correctamente',
          type: 'success'
        });
        this.router.navigateByUrl('/aceites');
      });
    }
  }
}