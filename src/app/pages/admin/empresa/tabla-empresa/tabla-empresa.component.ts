import { EmpresaService } from 'src/app/core/services/empresa.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormEmpresaComponent } from '../form-empresa/form-empresa.component';
import { DialogService } from 'src/app/core/services/dialog.service';

@Component({
  selector: 'app-tabla-empresa',
  templateUrl: './tabla-empresa.component.html',
  styleUrls: ['./tabla-empresa.component.css']
})
export class TablaEmpresaComponent implements OnInit {

  public title = 'Tabla de empresas';
  public displayedColumns: string[] = ['id', 'denominacion', 'domicilio', 'email', 'horario',
  'latitud', 'longitud', 'quienesSomos', 'telefono' ];
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
    this.empresaService.getEmpresas().subscribe( res => {
      this.dataSource.data = res;
      this.notifyTable();
    });
  }

  onSubmit(object: any) {
    this.dialog.open(FormEmpresaComponent, { disableClose: true, data: object })
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
    this.empresaService.createEmpresa(empresa);
    this.success('Añadido!', 'Se ha añadido correctamente.');
  }

  update(empresa: Empresa) {
    this.empresaService.updateEmpresa(empresa.id, empresa);
    this.success('Actualizado!', 'Se ha actualizado correctamente.');
  }

  delete(id: string) {
    this.empresaService.delete(id);
    this.success('Eliminado!', 'Se ha eliminado correctamente.');
  }

  success(title: string, text: string) {
    this.dialogService.success(title, text);
    this.notifyTable();
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
