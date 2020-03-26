import { Injectable } from '@angular/core';
import { Noticia } from 'src/app/shared/models/noticia.model';
import { FirestoreService } from './firestore.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService extends FirestoreService<Noticia> {
  protected endpoint = 'noticias';

  getFive(idEmpresa: string) {
    return this.firestore.collection<Noticia>(this.endpoint, ref => {
      return ref.where('idEmpresa', '==', idEmpresa).limit(5);
    }).snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Noticia;
          data.id = action.payload.doc.id;
          return data;
        },
        err => {
          console.log('Ocurrió un error');
        });
      }));
  }
}
