import { AuthService } from './../../services/auth.service';

import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from './../../models/usuario.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel();
  recordarme = false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }


  login(form: NgForm) {
    if (form.invalid) { return; }

    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor'
    });
    Swal.showLoading();

    this.auth.login(this.usuario).subscribe(res => {
      console.log(res);
      Swal.close();
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }
      this.router.navigateByUrl('/home');

    }, (err) => {
      // console.log(err.error.error.message);
      let errorNombre: string;
      let tipoError: string;

      tipoError = err.error.error.message;

      if (tipoError === 'EMAIL_NOT_FOUND') {
        errorNombre = 'El email no existe';
        // console.log('ERROR NOMBRE', errorNombre);

      } else {
        errorNombre = 'La contraseña es incorrecta';
      }


      Swal.fire({
        type: 'error',
        title: 'Los datos ingresados son incorrectos',
        text: errorNombre
      });


    });
  }

}
