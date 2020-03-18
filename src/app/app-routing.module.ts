import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';
import { IndexComponent } from './pages/index/index.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { BuscadorComponent } from './pages/buscador/buscador.component';

const routes: Routes = [
  { path: 'buscador', component: BuscadorComponent },
  { path: 'detalle', component: DetalleComponent },
  { path: 'home', component: HomeComponent, data: {title: 'home', toolbar: true}},
  { path: 'index', component: IndexComponent, data: {title: 'index', toolbar: false} },
  { path: '404', component: Page404Component },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
