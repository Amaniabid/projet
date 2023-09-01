import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/entities/group';
import { User } from 'src/app/entities/user';
import { GroupeService } from 'src/app/service/groupe.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groupe',
  templateUrl: './groupe.component.html',
  styleUrls: ['./groupe.component.scss']
})
export class GroupeComponent implements OnInit {
  users: User[] = [];
  selectedMembers: FormControl = new FormControl();
  groupe:string;
  constructor(private userService: UserService,private groupeService: GroupeService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.userService.getUsersRoleUser().subscribe(
      response => {
        this.users = response;
        this.route.queryParams.subscribe(params => {
          this.groupe = params['groupe'];
        });
        if (this.groupe != undefined) {
          this.titlePage = "Modifier un groupe";
          this.titleButton = "Mis à jour groupe";
          const groupeUpdate: Group = JSON.parse(this.groupe) as unknown as Group;
          this.auteur = groupeUpdate.name;
          this.groupeAEcrire = groupeUpdate.description;
          var listeGroupe=[];
          groupeUpdate.members.forEach(ele => {
            this.users.forEach(item => {
              if(ele.id==item.id)
                listeGroupe.push(item)
            });
          });
          this.selectedMembers.setValue(listeGroupe);
        }
      },
      error => {
        console.error(error);
      }
    );
  }
  groupeAEcrire: string = '';
  auteur: string = '';
  titlePage="Ajouter un groupe";
  titleButton="Ajouter groupe";
  ajouterGroupe() {
    if(this.auteur!="" && this.groupeAEcrire!="" && this.selectedMembers.value!=""  ){
    var g=new Group();
    g.name=this.auteur;
    g.members=this.selectedMembers.value;
    g.description=this.groupeAEcrire;
    var userAct=JSON.parse(localStorage.getItem('user'));
      var user=new User();
      user.id=userAct.id;
      user.firstname= userAct.firstname;
      user.lastname=userAct.lastname;
      user.email=userAct.email;
      user.role=userAct.role;
      g.user=user;
    if (this.groupe != undefined) {
      const groupeUpdate: Group = JSON.parse(this.groupe) as unknown as Group;
      this.groupeService.updateGroupe(groupeUpdate.id,g).subscribe(
        response => {
          Swal.fire('Success', 'groupe modifie avec succès.', 'success');
          this.router.navigate(['/groupe']);
        },
        error => {
          console.error(error);
        }
      );
    }
    else
    this.groupeService.createGroupe(g).subscribe(
      response => {
        Swal.fire('Success', 'groupe ajoute avec succès.', 'success');
        this.router.navigate(['/groupe']);
      },
      error => {
        console.error(error);
      }
    );}
    else{
      Swal.fire('Error', 'Veuillez vérifier vos données.', 'error');
    }
  }
  returnGroupe(){
    this.router.navigate(['/groupe']);
  }
}