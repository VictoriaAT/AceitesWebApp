import { Component, OnInit } from '@angular/core';
import { AceitesService } from './../../services/aceites.service';
import { AceiteModel } from './../../models/aceite.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-aceites',
  templateUrl: './aceites.component.html',
  styleUrls: ['./aceites.component.css']
})
export class AceitesComponent implements OnInit {

  aceites: AceiteModel[] = [];
  cargando = false;

  constructor(private servicio: AceitesService) { }

  ngOnInit() {
    this.cargando = true;
    this.servicio.getAceites().subscribe(resp => {
      this.aceites = resp;
      this.cargando = false;
    }
    );
  }


  borrarAceite(aceite: AceiteModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `¿Está seguro de que quiere eliminar a ${aceite.nombre}?`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.aceites.splice(i, 1);
        this.servicio.borrarAceite(aceite.id).subscribe();
      }
    });

  }

}
