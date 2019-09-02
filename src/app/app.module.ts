import { AceitesService } from './services/aceites.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AceiteComponent } from './pages/aceite/aceite.component';
import { AceitesComponent } from './pages/aceites/aceites.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { InfoaceiteComponent } from './pages/infoaceite/infoaceite.component';


@NgModule({
  declarations: [
    AppComponent,
    AceiteComponent,
    AceitesComponent,
    RegistroComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    InfoaceiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule

  ],
  providers: [AceitesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
