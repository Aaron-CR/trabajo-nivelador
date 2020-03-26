import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// App modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './core/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { EditorModule } from '@tinymce/tinymce-angular';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { Page404Component } from './pages/page404/page404.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { AdminEmpresaComponent } from './pages/admin-empresa/admin-empresa.component';
import { AdminNoticiaComponent } from './pages/admin-noticia/admin-noticia.component';
import { FormEmpresaComponent } from './pages/admin-empresa/form-empresa/form-empresa.component';
import { FormNoticiaComponent } from './pages/admin-noticia/form-noticia/form-noticia.component';
import { MapComponent } from './pages/map/map.component';

// Firebase services and enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Services guards and pipes
import { EmpresaService } from './core/services/empresa.service';
import { NoticiaService } from './core/services/noticia.service';
import { EmpresaPipe } from './shared/pipes/empresa.pipe';

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
    FormEmpresaComponent,
    FormNoticiaComponent,
    ToolbarComponent,
    AdminEmpresaComponent,
    AdminNoticiaComponent,
    MapComponent,
    EmpresaPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    GoogleMapsModule,
    EditorModule
  ],
  providers: [
    AngularFirestore,
    EmpresaService,
    NoticiaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
