import { Component, OnInit } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  empresas: Empresa[] = [];
  constructor(public empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.empresaService.getEmpresas()
      .subscribe(products => { this.empresas = products; });
  }

  // TODO: Agregar metodo VER PAGINA

}
