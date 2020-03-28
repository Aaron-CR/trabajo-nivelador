import { EmpresaService } from './../../core/services/empresa.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/app/core/services/noticia.service';
import { Noticia } from 'src/app/shared/models/noticia.model';
import { Location } from '@angular/common';
import { HomeObserverService } from 'src/app/core/services/home-observer.service';
import { Empresa } from 'src/app/shared/models/empresa.model';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {

  public noticia: Noticia = {
    id: '',
    titulo: '',
    resumen: '',
    imagen: '',
    contenidoHTML: '',
    publicada: '',
    fechaPublicacion: '',
    idEmpresa: '',
  };

  public empresa: Empresa = {
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

  constructor(private noticiaService: NoticiaService,
              private rutaActiva: ActivatedRoute,
              private location: Location,
              private observerService: HomeObserverService,
              private empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.observerService.empresaDestino.subscribe( res => {
      this.empresa = res;
    });
    this.rutaActiva.params.subscribe(data => {
      if (data.id !== undefined) {
        this.getOneNoticia(data.id);
      }
    });
  }

  getOneNoticia(idNoticia: string) {
    this.noticiaService.getOne(idNoticia).subscribe( res => {
      this.noticia = res;
      this.getOneEmpresa(res.idEmpresa);
    });
  }

  getOneEmpresa(id: string) {
    this.empresaService.getOne(id).subscribe(res => {
      this.empresa = res;
      this.observerService.changeId(res);
    });
  }

  goBack() {
    this.location.back();
  }

}
