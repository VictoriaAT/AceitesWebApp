

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AceiteModel } from './../models/aceite.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { FileItem } from './../models/file-item';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AceitesService {

  private url = 'https://aceiteswebapp.firebaseio.com/';
  private ACEITES = 'img';

  urlImagen: string;
  public progreso: number;
  public downloadURL: string;
  aceite = new AceiteModel();
  public nombreArchivo = '';


  constructor(private db: AngularFirestore, private http: HttpClient) { }


  // private guardarImagen(aceite: AceiteModel) {
  //   this.db.collection(`${this.ACEITES}`).add(aceite);
  // }

  insertarAceite(aceite: AceiteModel) {
    return this.http.post(`${this.url}/aceites.json`, aceite).pipe(
      map((resp: any) => {
        aceite.id = resp.name;
        aceite.urlImagen = this.downloadURL;
        return aceite;
      })
    );
  }



  actualizarAceite(aceite: AceiteModel) {

    const aceiteTemp = {
      ...aceite,
    };
    delete aceiteTemp.id;

    return this.http.put(`${this.url}/aceites/${aceite.id}.json`, aceiteTemp);
  }


  getAceites() {
    return this.http.get(`${this.url}/aceites.json`).pipe(map(this.crearArreglo));

  }

  getInfoAceite(id: string) {
    return this.http.get(`${this.url}/aceites/${id}.json`);
  }

  borrarAceite(id: string) {
    return this.http.delete(`${this.url}/aceites/${id}.json`);
  }

  private crearArreglo(aceitesOBJ: Object) {
    const aceites: AceiteModel[] = [];
    console.log(aceitesOBJ);

    Object.keys(aceitesOBJ).forEach(key => {
      const aceite: AceiteModel = aceitesOBJ[key];
      aceite.id = key;
      aceites.push(aceite);
    });

    if (aceitesOBJ === null) {
      return [];
    }

    return aceites;

  }

  upload(event) {

    const storageRef = firebase.storage().ref();
    const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.ACEITES}/${event.target.files[0].name}`)
      .put(event.target.files[0]);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) => this.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
      (error) => console.error('Error al subir', error),
      () => {
        console.log('Image uploaded succesfully');
        uploadTask.snapshot.ref.getDownloadURL().then(
          (onfullfilled: any) => {
            Swal.fire({
              imageUrl: onfullfilled,
              title: 'Tu imagen se cargó exitosamente',
              showConfirmButton: true
            });
            // console.log('(promise) the download url is:  ' + onfullfilled);
            this.downloadURL = onfullfilled;
            console.log('Url Imagen', this.downloadURL);
            return this.downloadURL;

          },

          (onrejected: any) => {
            console.log('(promise) the download url has been rejected');
          });
      }
    );


  }






}
