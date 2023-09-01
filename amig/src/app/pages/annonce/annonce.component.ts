import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from 'src/app/entities/annonce';
import { User } from 'src/app/entities/user';
import { AnnonceService } from 'src/app/service/annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.scss']
})
export class AnnonceComponent implements OnInit{
  auteur: string = '';
  date: string = '';
  emplacement: string = '';
  contact: string = '';
  annonce:string;
  titlePage="Ajouter un annonce";
  titleButton="Ajouter annonce";
  constructor(private annonceService: AnnonceService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.annonce = params['Annonce'];
    });
    if (this.annonce != undefined) {
      this.titlePage = "Modifier un annonce";
      this.titleButton = "Mis à jour annonce";
      const avisUpdate: Annonce = JSON.parse(this.annonce) as unknown as Annonce;
      this.auteur = avisUpdate.title;
      this.date = new Date(avisUpdate.startDate).toISOString().substring(0, 10);
      this.emplacement = avisUpdate.location;
      this.contact = avisUpdate.contact;
    }
  }
  addAnnonce() {
    if(this.auteur!="" && this.date!="" && this.emplacement!="" && this.contact!="")
    {const newAnnonce = new Annonce();
    newAnnonce.title= this.auteur;
    newAnnonce.startDate= this.date;
    newAnnonce.location=this.emplacement;
    newAnnonce.contact=this.contact;
    var userAct=JSON.parse(localStorage.getItem('user'));
      var user=new User();
      user.id=userAct.id;
      user.firstname= userAct.firstname;
      user.lastname=userAct.lastname;
      user.email=userAct.email;
      user.role=userAct.role;
      newAnnonce.user=user;
    if (this.annonce != undefined) {
      const annonceUpdate: Annonce = JSON.parse(this.annonce) as unknown as Annonce;
      this.annonceService.updateAnnonce(annonceUpdate.id,newAnnonce).subscribe(
        response => {
          Swal.fire('Success', 'annonce modifie avec succès.', 'success');
          this.router.navigate(['/annonce']);
        },
        error => {
          console.error(error);
        }
      );
    }
    else
    this.annonceService.createAnnonce(newAnnonce).subscribe(
      response => {
        Swal.fire('Success', 'annonce ajoute avec succès.', 'success');
        this.router.navigate(['/annonce']);
      },
      error => {
        console.error(error);
      }
    );}
    
    else{
      Swal.fire('Error', 'Veuillez vérifier vos données.', 'error');
    }
  }
  returnAnnonce(){
    this.router.navigate(['/annonce']);
  }
  }
  
  