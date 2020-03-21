import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  public title = 'Listado de empresas';
  public displayedColumns: string[] = ['denominacion'];
  public dataSource: MatTableDataSource<Empresa> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public empresaService: EmpresaService) { }

  ngOnInit(): void {
    this.empresaService.getCollection().subscribe(res => {
      this.dataSource.data = res;
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

}
