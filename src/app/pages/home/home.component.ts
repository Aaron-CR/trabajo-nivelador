import { NoticiaService } from 'src/app/core/services/noticia.service';
import { HomeObserverService } from './../../core/services/home-observer.service';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Noticia } from 'src/app/shared/models/noticia.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  public noticias: Noticia[];

  constructor(
    private empresaService: EmpresaService,
    private noticiaService: NoticiaService,
    private rutaActiva: ActivatedRoute,
    private observerService: HomeObserverService
  ) {
    this.rutaActiva.params.subscribe(data => {
      if (data.id !== undefined) {
        this.getOneEmpresa(data.id);
        this.getFiveNoticias(data.id);
      }
    });
  }

  ngOnInit(): void {}

  getOneEmpresa(id: string) {
    this.empresaService.getOne(id).subscribe(res => {
      this.empresa = res;
      this.observerService.changeId(res);
    });
  }

  getFiveNoticias(idEmpresa: string) {
    this.noticiaService.getFive(idEmpresa).subscribe( res => {
      this.noticias = res;
    });
  }
}
