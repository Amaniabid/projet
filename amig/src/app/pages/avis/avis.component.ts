import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Publication } from 'src/app/entities/publication';
import { User } from 'src/app/entities/user';
import { AvisService } from 'src/app/service/avis.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-avis',
  templateUrl: './avis.component.html',
  styleUrls: ['./avis.component.scss']
})
export class AvisComponent implements OnInit{
    publicationAEcrire: string = '';
    auteur: string = '';
    avis:string;
    
    titlePage="Ajouter un avis";
    titleButton="Ajouter avis";
    constructor(private avisService: AvisService, private router: Router,private route: ActivatedRoute) {}
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.avis = params['avis'];
      });
      if (this.avis != undefined) {
        this.titlePage = "Modifier un avis";
        this.titleButton = "Mis à jour avis";
        const avisUpdate: Publication = JSON.parse(this.avis) as unknown as Publication;
        this.auteur = avisUpdate.titre;
        this.publicationAEcrire = avisUpdate.contenu;
      }
    }
    ajouterPublication() {
      if(this.auteur!="" && this.publicationAEcrire!="" ){
      const avis = new Publication();
      avis.titre=this.auteur;
      avis.contenu=this.publicationAEcrire;
      var userAct=JSON.parse(localStorage.getItem('user'));
      var user=new User();
      user.id=userAct.id;
      user.firstname= userAct.firstname;
      user.lastname=userAct.lastname;
      user.email=userAct.email;
      user.role=userAct.role;
      avis.user=user;
      if (this.avis != undefined) {
        const avisUpdate: Publication = JSON.parse(this.avis) as unknown as Publication;
        this.avisService.updateAvis(avisUpdate.id,avis).subscribe(
          response => {
            Swal.fire('Success', 'avis modifie avec succès.', 'success');
            this.router.navigate(['/avis']);
          },
          error => {
            console.error(error);
          }
        );
      }
      else
      this.avisService.createAvis(avis).subscribe(
        response => {
          Swal.fire('Success', 'avis ajoute avec succès.', 'success');
          this.router.navigate(['/avis']);
        },
        error => {
          console.error(error);
        }
      );
    }
    else{
      Swal.fire('Error', 'Veuillez vérifier vos données.', 'error');
    }
    }
    returnAvis(){
      this.router.navigate(['/avis']);
    }
    
  
  }
  
  
