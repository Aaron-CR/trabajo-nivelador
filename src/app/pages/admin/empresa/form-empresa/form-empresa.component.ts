import { Empresa } from 'src/app/shared/models/empresa.model';
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-empresa',
  templateUrl: './form-empresa.component.html',
  styleUrls: ['./form-empresa.component.css']
})
export class FormEmpresaComponent implements OnInit {

  public localData: Empresa;
  public action: string;
  public formEmpresa: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormEmpresaComponent>,
    public formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Empresa
  ) {
    this.localData = { ...data };
  }

  ngOnInit(): void {
    this.buildForm();
    this.setAction();
  }

  buildForm() {
    this.formEmpresa = this.formBuilder.group({
      id: [this.localData.id],
      denominacion: [this.localData.denominacion, [Validators.required]],
      domicilio: [this.localData.domicilio, [Validators.required]],
      email: [this.localData.email, [Validators.required]],
      horario: [this.localData.horario, [Validators.required]],
      latitud: [this.localData.latitud, [Validators.required]],
      longitud: [this.localData.longitud, [Validators.required]],
      quienesSomos: [this.localData.quienesSomos, [Validators.required]],
      telefono: [this.localData.telefono, [Validators.required]]
    });
  }

  setAction() {
    this.action = (this.localData.id) ? 'Editar' : 'Añadir';
  }

  onAction() {
    this.dialogRef.close({ event: this.action, data: this.formEmpresa.value });
  }

  onCancel() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  public errorHandling = (control: string, error: string) => {
    return this.formEmpresa.controls[control].hasError(error);
  }

}
