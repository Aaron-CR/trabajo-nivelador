import { Empresa } from 'src/app/shared/models/empresa.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeObserverService {

  public modeloEmpresa: Empresa = {
    denominacion: '',
    domicilio: '',
    horario: '',
    email: '',
    latitud: 0,
    longitud: 0,
    quienesSomos: '',
    telefono: '',
    id: ''
  };
  public empresaOrigen = new BehaviorSubject<Empresa>(this.modeloEmpresa);
  public empresaDestino = this.empresaOrigen.asObservable();
  constructor() { }

  public changeId(empresa: Empresa): void {
    this.empresaOrigen.next(empresa);
  }
}
