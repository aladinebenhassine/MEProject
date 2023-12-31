import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { HomeComponent } from './home.component';
import { AuthGuard } from './auth/auth.guard';
import { MatchComponent } from './match/match.component';
import {AdnSingleEliminationTreeModule} from "@adonsio/adn-tournament";
// import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,LoginComponent,RegisterComponent,MatchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AdnSingleEliminationTreeModule,
    // DragDropModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      //{ path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
