import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AceiteComponent } from './pages/aceite/aceite.component';
import { AceitesComponent } from './pages/aceites/aceites.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { InfoaceiteComponent } from './pages/infoaceite/infoaceite.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // canActivate: [AuthGuard] 
  { path: 'home', component: HomeComponent },
  { path: 'aceites', component: AceitesComponent },
  { path: 'aceite/:id', component: AceiteComponent },
  { path: 'informacion/:id', component: InfoaceiteComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'registro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
