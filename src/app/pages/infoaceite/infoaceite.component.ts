import { Component, OnInit } from '@angular/core';
import { AceitesService } from './../../services/aceites.service';
import { AceiteModel } from './../../models/aceite.model';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-infoaceite',
  templateUrl: './infoaceite.component.html',
  styles: []
})
export class InfoaceiteComponent implements OnInit {

  aceite = new AceiteModel();
  noImage = '../../../assets/noImage.png';
  constructor(private servicio: AceitesService, private route: ActivatedRoute) {
  }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.servicio.getInfoAceite(id).subscribe((resp: AceiteModel) => {
      this.aceite = resp;
      this.aceite.id = id;

      if (!this.aceite.urlImagen) {
        this.aceite.urlImagen = this.noImage;
        return this.aceite.urlImagen;
      }
      else {
        return this.aceite.urlImagen;
      }

    });
  }

}
