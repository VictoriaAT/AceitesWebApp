import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from './../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  usuario = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    if (form.invalid) { return; }


    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();


    this.auth.nuevoUsuario(this.usuario).subscribe(
      res => {
        console.log(res);
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home');
      },

      (err) => {

        let errorNombre: string;
        let tipoError: string;

        tipoError = err.error.error.message;


        console.log(tipoError);

        if (tipoError === 'EMAIL_EXISTS') {
          errorNombre = 'El email ya existe';
          console.log('ERROR NOMBRE', errorNombre);


        }

        Swal.fire({
          type: 'error',
          title: 'Los datos ingresados son incorrectos',
          text: errorNombre
        });
      }
    );

  }

}
