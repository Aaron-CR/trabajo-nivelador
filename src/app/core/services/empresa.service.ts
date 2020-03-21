import { Injectable } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService extends FirestoreService<Empresa> {
  protected endpoint = 'empresas';
}
