import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoticiaService } from 'src/app/core/services/noticia.service';
import { Noticia } from 'src/app/shared/models/noticia.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { HomeObserverService } from 'src/app/core/services/home-observer.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  public texto: string;
  public empresaId: string;
  public noticias: Noticia[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public noticiaService: NoticiaService,
    public empresaService: EmpresaService,
    public observerService: HomeObserverService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params.id !== undefined) {
        this.texto = params.texto;
        this.empresaId = params.id;
        this.getEmpresa(params.id);
        this.getNoticias(params.id);
      }
    });
  }

  getEmpresa(id: string) {
    this.empresaService.getOne(id).subscribe(res => {
      this.observerService.changeId(res);
    });
  }

  getNoticias(idEmpresa: string) {
    this.noticiaService.getNoticias(idEmpresa, 20).subscribe(res => {
      this.noticias = res;
    });
  }

}
