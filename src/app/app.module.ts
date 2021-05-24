import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { ViewsModule } from './views/views.module';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { LayoutContainersModule } from './containers/layout/layout.containers.module';
import { CanReadGuard } from "../app/guards/can-read.guard";
import { CanEditGuard } from "../app/guards/can-edit.guard";
import { CanDeleteGuard } from "../app/guards/can-delete.guard";

@NgModule({
  imports: [
    BrowserModule,
    ViewsModule,
    AppRoutingModule,
    LayoutContainersModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot(),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [AngularFirestore, CanReadGuard, CanEditGuard, CanDeleteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
