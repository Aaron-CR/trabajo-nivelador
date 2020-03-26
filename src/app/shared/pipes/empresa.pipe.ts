import { Pipe, PipeTransform } from '@angular/core';
import { Empresa } from '../models/empresa.model';

@Pipe({
  name: 'empresa'
})
export class EmpresaPipe implements PipeTransform {
  private denominacion: string;

  transform(idEmpresa: string, empresas: Empresa[]): string {
    empresas.forEach(e => {
      if (idEmpresa === e.id) {
        this.denominacion = e.denominacion;
      }
    });
    return this.denominacion;
  }

}
