import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reclamation } from 'src/app/entities/reclamation';
import { User } from 'src/app/entities/user';
import { ReclamationService } from 'src/app/service/reclamation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.scss']
})
export class ReclamationComponent  {
    reclamationAEcrire: string = '';
    title: string = '';
    recl:string;
    titlePage="Ajouter un réclamation";
    titleButton="Ajouter réclamation";
    constructor(private reclService: ReclamationService, private router: Router,private route: ActivatedRoute) {}
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.recl = params['reclamation'];
      });
      if (this.recl != undefined) {
        this.titlePage = "Modifier un réclamation";
        this.titleButton = "Mis à jour réclamation";
        const reclUpdate: Reclamation = JSON.parse(this.recl) as unknown as Reclamation;
        this.title = reclUpdate.titre;
        this.reclamationAEcrire = reclUpdate.description;
      }
    }
    ajouterreclamation() {
      if(this.title!="" && this.reclamationAEcrire!=""  ){
      const recl = new Reclamation();
      recl.titre=this.title;
      recl.description=this.reclamationAEcrire;
      var userAct=JSON.parse(localStorage.getItem('user'));
      var user=new User();
      user.id=userAct.id;
      user.firstname= userAct.firstname;
      user.lastname=userAct.lastname;
      user.email=userAct.email;
      user.role=userAct.role;
      recl.user=user;
      if (this.recl != undefined) {
        const reclUpdate: Reclamation = JSON.parse(this.recl) as unknown as Reclamation;
        this.reclService.updateReclamation(reclUpdate.id,recl).subscribe(
          response => {
            Swal.fire('Success', 'reclamation modifie avec succès.', 'success');
            this.router.navigate(['/reclamation']);
          },
          error => {
            console.error(error);
          }
        );
      }
      else
      this.reclService.createReclamation(recl).subscribe(
        response => {
          Swal.fire('Success', 'reclamation ajoute avec succès.', 'success');
          this.router.navigate(['/reclamation']);
        },
        error => {
          console.error(error);
        }
      );}
      else{
        Swal.fire('Error', 'Veuillez vérifier vos données.', 'error');
      }
      //this.reclamation.push(this.reclamationAEcrire + ' (' + this.auteur + ')');
      //this.reclamationAEcrire = '';
    }
    returnRecl(){
      this.router.navigate(['/reclamation']);
    }
    
    }
  
  
