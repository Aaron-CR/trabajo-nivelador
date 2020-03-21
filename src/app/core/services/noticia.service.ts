import { Injectable } from '@angular/core';
import { Noticia } from 'src/app/shared/models/noticia.model';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService extends FirestoreService<Noticia> {
  protected endpoint = 'noticias';
}
