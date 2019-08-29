
import { Component, OnInit } from '@angular/core';
import { AceiteModel } from './../../models/aceite.model';
import { NgForm } from '@angular/forms';
import { AceitesService } from './../../services/aceites.service';
import { HttpClient } from '@angular/common/http';
import { FileItem } from 'src/app/models/file-item';
import { AngularFireStorage } from '@angular/fire/storage';

import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
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


  constructor(public servicio: AceitesService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');


    if (id !== 'nuevo') {
      this.servicio.getInfoAceite(id).subscribe((resp: AceiteModel) => {
        this.aceite = resp;
        this.aceite.id = id;
        this.aceite.urlImagen = this.servicio.downloadURL;
      });
    }


  }

  guardar(form: NgForm) {

    this.aceite.urlImagen = this.servicio.downloadURL;
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

      peticion = this.servicio.actualizarAceite(this.aceite);

      peticion.subscribe(resp => {
        Swal.fire({
          title: this.aceite.nombre,
          text: 'Se actualizó correctamente',
          type: 'success'
        });
      });
    } else {
      peticion = this.servicio.insertarAceite(this.aceite);
      peticion.subscribe(resp => {
        Swal.fire({
          title: this.aceite.nombre,
          text: 'Se guardó la información correctamente',
          type: 'success'
        });
      });
    }

  }




















}
