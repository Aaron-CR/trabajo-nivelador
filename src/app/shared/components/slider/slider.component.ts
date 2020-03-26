import { Component, OnInit, Input } from '@angular/core';
import { Noticia } from '../../models/noticia.model';
import { HomeObserverService } from 'src/app/core/services/home-observer.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

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

  @Input() set noticias(value) {
    if (value !== null) {
        this.noticiaPrincipal = value.shift();
        this.noticiasArreglo = value;
    }
  }

  constructor(private observerService: HomeObserverService) { }

  ngOnInit(): void {

  }

}
