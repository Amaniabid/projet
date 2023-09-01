import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { EventListComponent } from './pages/event-list/event-list.component';
import { AvisListComponent } from './pages/avis-list/avis-list.component';
import { ReclamationListComponent } from './pages/reclamation-list/reclamation-list.component';
import { AnnonceListComponent } from './pages/annonce-list/annonce-list.component';
import { PlanningListComponent } from './pages/planning-list/planning-list.component';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { GroupeListComponent } from './pages/groupe-list/groupe-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorsInterceptor } from './cors.interceptor';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    HttpClientModule,
    ComponentsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    CommonModule,
    NgbModule,
    RouterModule,
    MatTableModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    EventListComponent,
    AvisListComponent,
    ReclamationListComponent,
    AnnonceListComponent,
    PlanningListComponent,
    GroupeListComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
