import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// App routing modules
import { AppRoutingModule } from './app-routing.module';

// App components
import { AppComponent } from './app.component';
import { Page404Component } from './pages/page404/page404.component';
import { IndexComponent } from './pages/index/index.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// Firebase services and enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Services and guards
import { EmpresaService } from './core/services/empresa.service';
import { NoticiaService } from './core/services/noticia.service';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    IndexComponent,
    BuscadorComponent,
    DetalleComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    AngularFirestore,
    EmpresaService,
    NoticiaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
