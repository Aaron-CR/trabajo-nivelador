import { EmpresaService } from 'src/app/core/services/empresa.service';
import { HomeObserverService } from './../../../core/services/home-observer.service';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Noticia } from '../../models/noticia.model';
import { NoticiaService } from 'src/app/core/services/noticia.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() visible: boolean;
  public texto: string;
  public empresa: Empresa;

  noticiaCtrl = new FormControl();
  filteredNoticias: Observable<Noticia[]>;
  noticias: Noticia[];

  constructor(
    public activatedRoute: ActivatedRoute,
    public observerService: HomeObserverService,
    public noticiaService: NoticiaService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.observerService.empresaDestino.subscribe(res => {
      this.empresa = res;
      this.getNoticias(this.empresa.id);
    });
  }

  goHome() {
    this.router.navigate(['home/' + this.empresa.id]);
  }

  getNoticias(idEmpresa: string) {
    this.noticiaService.getNoticias(idEmpresa, 20).subscribe(res => {
      this.noticias = res;
      this.filteredNoticias = this.noticiaCtrl.valueChanges
        .pipe(
          startWith(''),
          map(state => state ? this._filterNoticias(state) : this.noticias.slice())
        );
    });
  }

  private _filterNoticias(value: string): Noticia[] {
    const filterValue = value.toLowerCase();
    return this.noticias.filter(noticia => {
      return noticia.titulo.toLowerCase().indexOf(filterValue) === 0
        || noticia.resumen.toLowerCase().indexOf(filterValue) === 0;
    });
  }
}
