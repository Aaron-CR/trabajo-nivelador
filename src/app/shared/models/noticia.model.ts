import { Base } from './base';

export class Noticia extends Base {
  titulo: string;
  resumen: string;
  imagen: string;
  contenidoHTML: string;
  publicada: string;
  fechaPublicacion: Date;
  idEmpresa: string;
}
