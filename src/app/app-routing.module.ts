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
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'aceites', component: AceitesComponent, canActivate: [AuthGuard] },
  { path: 'aceite/:id', component: AceiteComponent, canActivate: [AuthGuard] },
  { path: 'informacion/:id', component: InfoaceiteComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'registro' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
