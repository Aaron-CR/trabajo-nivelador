import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { Page404Component } from './pages/page404/page404.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';
import { AdminEmpresaComponent } from './pages/admin-empresa/admin-empresa.component';
import { AdminNoticiaComponent } from './pages/admin-noticia/admin-noticia.component';

const routes: Routes = [
  { path: 'index', component: IndexComponent, data: { visible: false } },
  { path: 'admin/empresas', component: AdminEmpresaComponent, data: { visible: false } },
  { path: 'admin/noticias', component: AdminNoticiaComponent, data: { visible: false } },
  { path: 'home/:id', component: HomeComponent },
  { path: 'buscador/:id/:texto', component: BuscadorComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: '404', component: Page404Component },
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
