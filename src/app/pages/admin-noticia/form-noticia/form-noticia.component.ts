import { Component, OnInit, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Empresa } from 'src/app/shared/models/empresa.model';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-form-noticia',
  templateUrl: './form-noticia.component.html',
  styleUrls: ['./form-noticia.component.scss']
})
export class FormNoticiaComponent implements OnInit {
  public localData: any;
  public action: string;
  public formNoticia: FormGroup;
  public localEmpresas: Empresa[];
  uploadPercent: Observable<number>;
  urlImage: Observable<string>;

  /* Permite realizar el imput de la imagen desde ts */
  @ViewChild('imageUser', { static: true }) inputImageUser: ElementRef;

  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormNoticiaComponent>,
    public formBuilder: FormBuilder,
    private storage: AngularFireStorage
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

  onUploadImg(e) {
    const oldImg = this.localData.data.imagen;
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/noticia_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => {
      this.urlImage = ref.getDownloadURL();
      this.urlImage.subscribe( url => {
        this.localData.data.imagen = url;
        console.log(this.localData.data.imagen);
        this.formNoticia.patchValue({imagen: this.localData.data.imagen});
      });
    })).subscribe();
  }


  public errorHandling = (control: string, error: string) => {
    return this.formNoticia.controls[control].hasError(error);
  }
}
