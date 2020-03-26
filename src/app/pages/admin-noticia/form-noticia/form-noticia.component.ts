import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empresa } from 'src/app/shared/models/empresa.model';

@Component({
  selector: 'app-form-noticia',
  templateUrl: './form-noticia.component.html',
  styleUrls: ['./form-noticia.component.css']
})
export class FormNoticiaComponent implements OnInit {
  public localData: any;
  public action: string;
  public formNoticia: FormGroup;
  public localEmpresas: Empresa[];

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormNoticiaComponent>,
    public formBuilder: FormBuilder,
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
    this.buildForm();
    this.setAction();
  }

  buildForm() {
    this.formNoticia = this.formBuilder.group({
      id: [this.localData.data.id],
      titulo: [this.localData.data.titulo, [Validators.required]],
      resumen: [this.localData.data.resumen, [Validators.required]],
      imagen: [this.localData.data.imagen, [Validators.required]],
      contenidoHTML: [this.localData.data.contenidoHTML, [Validators.required]],
      publicada: [this.localData.data.publicada, [Validators.required]],
      fechaPublicacion: [this.fechaPublicacion, [Validators.required]],
      idEmpresa: [this.localData.data.idEmpresa, [Validators.required]]
    });
  }

  get fechaPublicacion() {
    return this.localData.data.fechaPublicacion === undefined
      ? new Date()
      : new Date(this.localData.data.fechaPublicacion.toMillis());
  }

  setAction() {
    this.action = (this.localData.data.id) ? 'Editar' : 'Añadir';
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
