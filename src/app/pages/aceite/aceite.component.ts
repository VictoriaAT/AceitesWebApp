import { Component, OnInit } from '@angular/core';
import { AceiteModel } from './../../models/aceite.model';
import { NgForm } from '@angular/forms';
import { AceitesService } from './../../services/aceites.service';
import { HttpClient } from '@angular/common/http';
import { FileItem } from 'src/app/models/file-item';
import { AngularFireStorage } from '@angular/fire/storage';

import * as firebase from 'firebase';
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
  url = '';

<<<<<<< HEAD
  constructor(public servicio: AceitesService, private route: ActivatedRoute, private router: Router) {

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
          // this.url = this.aceite.urlImagen;

          // console.log('URL RECIEN CREADO', this.url.length);
          this.servicio.downloadURL = this.aceite.urlImagen;
          this.aceite.id = id;

        });




    }

=======
  constructor(private servicio: AceitesService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get('id');
    this.servicio
      .getInfoAceite('-Lml0V0sB_BxTXh3SzIN')
      .subscribe((resp: AceiteModel) => {
        this.aceite = resp;
        console.log(resp);
        this.aceite.id = id;
      });
  }
>>>>>>> 6b3a9c04c7e3adb4b5227ea5f3d83226270d84ee

  ngOnInit() {
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id !== 'nuevo') {
    //   this.servicio
    //     .getInfoAceite('-Lml0V0sB_BxTXh3SzIN')
    //     .subscribe((resp: AceiteModel) => {
    //       this.aceite = resp;
    //       console.log(this.aceite.urlImagen);
    //       this.aceite.id = id;
    //       this.aceite.urlImagen = this.servicio.downloadURL;
    //     });
    // }
  }

  guardar(form: NgForm) {
<<<<<<< HEAD

=======
    this.aceite.urlImagen = this.servicio.downloadURL;
>>>>>>> 6b3a9c04c7e3adb4b5227ea5f3d83226270d84ee
    console.log('Formulario', form);

    if (form.invalid) {
      console.log('Complete todos los campos');
      return;
    }


    let peticion: Observable<any>;

    if (this.aceite.id) {
<<<<<<< HEAD


      this.aceite.urlImagen = this.servicio.downloadURL;



      console.log('URL IMAGEN IMAGEN', this.aceite.urlImagen);


=======
>>>>>>> 6b3a9c04c7e3adb4b5227ea5f3d83226270d84ee
      peticion = this.servicio.actualizarAceite(this.aceite);


      peticion.subscribe(resp => {
        Swal.fire({
          title: this.aceite.nombre,
          text: 'Se actualizó correctamente',
          type: 'success'
        });
        this.router.navigateByUrl('/aceites');
        console.log('ACTUALIZAR THIS.SERVICIO', this.servicio.downloadURL);

        console.log('ACTUALIZAR THIS. URL', this.aceite.urlImagen);

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
<<<<<<< HEAD
}
=======
}
>>>>>>> 6b3a9c04c7e3adb4b5227ea5f3d83226270d84ee
