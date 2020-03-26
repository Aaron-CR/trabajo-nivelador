import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public title = 'Listado de empresas';
  public displayedColumns: string[] = ['denominacion'];
  public dataSource: MatTableDataSource<Empresa> = new MatTableDataSource();
  public idEmpresas: Empresa[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public empresaService: EmpresaService, private router: Router) { }

  ngOnInit(): void {
    this.empresaService.getCollection().subscribe(res => {
      this.dataSource.data = res;
      this.idEmpresas = res;
      this.notifyTable();
    });
  }

  notifyTable() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // TODO: Agregar metodo VER PAGINA
  goHome(item: any) {
    this.router.navigate(['home/' + item.id]);
  }
}
