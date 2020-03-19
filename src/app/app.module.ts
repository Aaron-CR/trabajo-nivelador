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
import { TablaEmpresaComponent } from './pages/admin/empresa/tabla-empresa/tabla-empresa.component';
import { FormEmpresaComponent } from './pages/admin/empresa/form-empresa/form-empresa.component';
import { FormNoticiaComponent } from './pages/admin/noticia/form-noticia/form-noticia.component';
import { TablaNoticiaComponent } from './pages/admin/noticia/tabla-noticia/tabla-noticia.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';

// Firebase services and enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Services and guards
import { EmpresaService } from './core/services/empresa.service';
import { NoticiaService } from './core/services/noticia.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Material module
import { MaterialModule } from './core/material/material.module';

// Formulario
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    IndexComponent,
    BuscadorComponent,
    DetalleComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TablaEmpresaComponent,
    FormEmpresaComponent,
    FormNoticiaComponent,
    TablaNoticiaComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
    AngularFirestore,
    EmpresaService,
    NoticiaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
