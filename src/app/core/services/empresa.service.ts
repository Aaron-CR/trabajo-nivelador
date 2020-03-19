import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private firestore: AngularFirestore) {
  }

  getEmpresas() {
    return this.firestore.collection<Empresa>('empresas').snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Empresa;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  createEmpresa(empresa: Empresa) {
    return this.firestore.collection<Empresa>('empresas').add(empresa);
  }

  updateEmpresa(id: string, empresa: Empresa) {
    return this.firestore.doc<Empresa>(`empresas/${id}`).update(empresa);
  }

  delete(id: string) {
    return this.firestore.doc<Empresa>(`empresas/${id}`).delete();
  }
}
