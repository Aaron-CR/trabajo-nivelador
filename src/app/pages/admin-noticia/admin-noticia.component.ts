import { Component, OnInit, ViewChild } from '@angular/core';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Noticia } from 'src/app/shared/models/noticia.model';
import { NoticiaService } from 'src/app/core/services/noticia.service';
import { EmpresaService } from 'src/app/core/services/empresa.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormNoticiaComponent } from './form-noticia/form-noticia.component';

@Component({
  selector: 'app-admin-noticia',
  templateUrl: './admin-noticia.component.html',
  styleUrls: ['./admin-noticia.component.scss']
})
export class AdminNoticiaComponent implements OnInit {
  public title = 'Tabla de noticias';
  public displayedColumns: string[] = ['titulo', 'idEmpresa', 'fechaPublicacion', 'publicada'];
  public dataSource: MatTableDataSource<Noticia> = new MatTableDataSource();
  public empresas: Empresa[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public noticiaService: NoticiaService,
    public empresaService: EmpresaService,
    public dialogService: DialogService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getNoticias();
    this.getEmpresas();
  }

  getNoticias() {
    this.noticiaService.getCollection().subscribe(res => {
      this.dataSource.data = res;
      this.notifyTable();
    });
  }

  getEmpresas() {
    this.empresaService.getCollection().subscribe(res => {
      this.empresas = res;
    });
  }

  onSubmit(object: any) {
    this.dialog.open(FormNoticiaComponent, { disableClose: true, data: { data: object, empresas: this.empresas }, width: '80%' })
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

  create(noticia: Noticia) {
    this.noticiaService.create(noticia);
    this.success('Añadido!', 'Se ha añadido correctamente.');
  }

  update(noticia: Noticia) {
    this.noticiaService.update(noticia);
    this.success('Actualizado!', 'Se ha actualizado correctamente.');
  }

  delete(id: string) {
    this.noticiaService.delete(id);
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
