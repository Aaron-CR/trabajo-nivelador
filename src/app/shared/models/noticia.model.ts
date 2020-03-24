import { Base } from './base';

export class Noticia extends Base {
  titulo: string;
  resumen: string;
  imagen: string;
  contenidoHTML: string;
  publicada: string;
  fechaPublicacion: any;
  idEmpresa: string;
}
