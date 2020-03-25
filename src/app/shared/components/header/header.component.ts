import { EmpresaService } from 'src/app/core/services/empresa.service';
import { HomeObserverService } from './../../../core/services/home-observer.service';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() visible: boolean;

  public empresa: Empresa;

  constructor(private observerService: HomeObserverService) { }

  ngOnInit(): void {
    this.observerService.empresaDestino.subscribe( res => {
      this.empresa = res;
    });
  }

}
