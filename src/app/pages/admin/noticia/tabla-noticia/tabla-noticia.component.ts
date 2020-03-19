import { Component, OnInit, ViewChild } from '@angular/core';
import { Noticia } from 'src/app/shared/models/noticia.model';
import { DialogService } from 'src/app/core/services/dialog.service';
import { FormNoticiaComponent } from '../form-noticia/form-noticia.component';
import { MatDialog } from '@angular/material/dialog';
import { NoticiaService } from 'src/app/core/services/noticia.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Empresa } from 'src/app/shared/models/empresa.model';

@Component({
  selector: 'app-tabla-noticia',
  templateUrl: './tabla-noticia.component.html',
  styleUrls: ['./tabla-noticia.component.css']
})
export class TablaNoticiaComponent implements OnInit {

  public title = 'Tabla de noticias';
  public displayedColumns: string[] = ['id', 'denominacion', 'domicilio', 'email', 'horario',
  'latitud', 'longitud', 'quienesSomos', 'telefono' ];
  public dataSource: MatTableDataSource<Noticia> = new MatTableDataSource();
  public empresas: Empresa[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public noticiaService: NoticiaService,
    public dialogService: DialogService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.noticiaService.getNoticias().subscribe( res => {
      this.dataSource.data = res;
      this.notifyTable();
    });
  }

  onSubmit(object: any) {
    this.dialog.open(FormNoticiaComponent, { disableClose: true, data: object })
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
    this.noticiaService.createNoticias(noticia);
    this.success('Añadido!', 'Se ha añadido correctamente.');
  }

  update(noticia: Noticia) {
    this.noticiaService.updateNoticias(noticia.id, noticia);
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
