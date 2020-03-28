import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  public noticiasArreglo: Noticia[];
  public noticiaPrincipal: Noticia = {
    id: '',
    titulo: '',
    resumen: '',
    imagen: '',
    contenidoHTML: '',
    publicada: '',
    fechaPublicacion: '',
    idEmpresa: '',
  };

  @Output() navNoticia = new EventEmitter<string>();

  @Input() set noticias(value) {
    if (value !== null) {
      this.noticiaPrincipal = value.shift();
      this.noticiasArreglo = value;
    }
  }

  constructor() { }

  irDetalle(idNoticia: string) {
    this.navNoticia.emit(idNoticia);
  }

}
