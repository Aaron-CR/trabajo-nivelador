import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empresa'
})
export class EmpresaPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
