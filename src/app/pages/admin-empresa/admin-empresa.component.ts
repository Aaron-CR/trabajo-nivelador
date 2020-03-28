import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormEmpresaComponent } from './form-empresa/form-empresa.component';

@Component({
  selector: 'app-admin-empresa',
  templateUrl: './admin-empresa.component.html',
  styleUrls: ['./admin-empresa.component.scss']
})
export class AdminEmpresaComponent implements OnInit {
  public title = 'Tabla de empresas';
  public displayedColumns: string[] = ['denominacion', 'email', 'telefono', 'domicilio'];
  public dataSource: MatTableDataSource<Empresa> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public empresaService: EmpresaService,
    public dialogService: DialogService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.empresaService.getCollection().subscribe(res => {
      this.dataSource.data = res;
      this.notifyTable();
    });
  }

  onSubmit(object: any) {
    this.dialog.open(FormEmpresaComponent, { disableClose: true, data: object, width: '80%' })
      .afterClosed().subscribe(result => {
        if (result.event === 'Añadir') {
          this.create(result.data);
        } else if (result.event === 'Editar') {
          this.update(result.data);
        }
      });
  }

  onDelete(item: any) {
    this.dialogService.delete().then((result) => {
      if (result.value) {
        this.delete(item.id);
      }
    });
  }

  create(empresa: Empresa) {
    this.empresaService.create(empresa);
    this.dialogService.success('Añadido!', 'Se ha añadido correctamente.');
  }

  update(empresa: Empresa) {
    this.empresaService.update(empresa);
    this.dialogService.success('Actualizado!', 'Se ha actualizado correctamente.');
  }

  delete(id: string) {
    this.empresaService.delete(id);
    this.dialogService.success('Eliminado!', 'Se ha eliminado correctamente.');
  }

  notifyTable() {
    this.dataSource.data = [...this.dataSource.data];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
