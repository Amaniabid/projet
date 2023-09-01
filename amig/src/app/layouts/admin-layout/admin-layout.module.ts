import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { AvisComponent } from '../../pages/avis/avis.component';
import { AnnonceComponent } from '../../pages/annonce/annonce.component';
import { EventComponent } from '../../pages/event/event.component';
import { GroupeComponent } from '../../pages/groupe/groupe.component';
import { PlanningComponent } from '../../pages/planning/planning.component';
import { AccueilComponent } from '../../pages/accueil/accueil.component';
import { ReclamationComponent } from '../../pages/reclamation/reclamation.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatSelectModule } from '@angular/material/select';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    NgbModule,
    ClipboardModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    ReclamationComponent,
    AvisComponent,
    AnnonceComponent,
    EventComponent,
    GroupeComponent,
    PlanningComponent,
    AccueilComponent,
    
  ]
})

export class AdminLayoutModule {}
