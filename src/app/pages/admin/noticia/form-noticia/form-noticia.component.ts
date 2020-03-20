import { EmpresaService } from './../../../../core/services/empresa.service';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/shared/models/noticia.model';
import { Empresa } from 'src/app/shared/models/empresa.model';

@Component({
  selector: 'app-form-noticia',
  templateUrl: './form-noticia.component.html',
  styleUrls: ['./form-noticia.component.css']
})
export class FormNoticiaComponent implements OnInit {

  public localData: Noticia;
  public action: string;
  public formNoticia: FormGroup;
  public empresas: Empresa[];


  constructor(
    public dialogRef: MatDialogRef<FormNoticiaComponent>,
    public formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Noticia,
    public empresaService: EmpresaService
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
    this.getAllEmpresas();
    this.buildForm();
    this.setAction();
  }

  buildForm() {
    this.formNoticia = this.formBuilder.group({
      id: [this.localData.id],
      titulo: [this.localData.titulo, [Validators.required]],
      resumen: [this.localData.resumen, [Validators.required]],
      imagen: [this.localData.imagen, [Validators.required]],
      contenidoHTML: [this.localData.contenidoHTML, [Validators.required]],
      publicada: [this.localData.publicada, [Validators.required]],
      fechaPublicacion: [this.localData.fechaPublicacion, [Validators.required]],
      idEmpresa: [this.localData.idEmpresa, [Validators.required]]
    });
  }

  getAllEmpresas() {
    this.empresaService.getCollection().subscribe(res => {
      this.empresas = res;
      console.log(this.empresas);
    });
  }

  setAction() {
    this.action = (this.localData.id) ? 'Editar' : 'Añadir';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: this.formNoticia.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  public errorHandling = (control: string, error: string) => {
    return this.formNoticia.controls[control].hasError(error);
  }

}
