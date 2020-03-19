import { Injectable } from '@angular/core';
import { Noticia } from 'src/app/shared/models/noticia.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(private firestore: AngularFirestore) { }

  getNoticias() {
    return this.firestore.collection<Noticia>('noticias').snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Noticia;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  createNoticias(noticia: Noticia) {
    return this.firestore.collection<Noticia>('noticias').add(noticia);
  }

  updateNoticias(id: string, noticia: Noticia) {
    return this.firestore.doc<Noticia>(`noticias/${id}`).update(noticia);
  }

  delete(id: string) {
    return this.firestore.doc<Noticia>(`empresas/${id}`).delete();
  }
}
