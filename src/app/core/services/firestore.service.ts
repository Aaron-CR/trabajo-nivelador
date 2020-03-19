import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Base } from 'src/app/shared/models/base';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService<T extends Base> {

  protected endpoint;

  constructor(private firestore: AngularFirestore) { }

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

  create(document: T) {
    return this.firestore.collection<T>(this.endpoint).add(document);
  }

  update(document: T) {
    return this.firestore.doc<T>(`${this.endpoint}/${document.id}`).update(document);
  }

  delete(id: string) {
    return this.firestore.doc<T>(`${this.endpoint}/${id}`).delete();
  }
}
