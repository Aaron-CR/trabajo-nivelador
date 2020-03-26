import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Base } from 'src/app/shared/models/base';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends Base> {
  protected endpoint;

  constructor(protected firestore: AngularFirestore) { }

  getCollection() {
    return this.firestore.collection<T>(this.endpoint).snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as T;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  getOne(id: string) {
    return  this.firestore.doc<T>(`${this.endpoint}/${id}`).snapshotChanges().pipe(map( action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as T;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  create(document: T) {
    document.id = this.firestore.createId();
    return this.firestore.doc<T>(`${this.endpoint}/${document.id}`).set(document);
  }

  update(document: T) {
    return this.firestore.doc<T>(`${this.endpoint}/${document.id}`).update(document);
  }

  delete(id: string) {
    return this.firestore.doc<T>(`${this.endpoint}/${id}`).delete();
  }
}
