import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanningService } from 'src/app/service/planning.service';
import { Planning } from '../../entities/planning';
import Swal from 'sweetalert2';
import { User } from 'src/app/entities/user';
@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.scss']
})
export class PlanningComponent implements OnInit {

  selectedPlanning = { titre: '', date: '', description: '' };
  planning:string;
  titlePage="Ajouter un planning";
  titleButton="Ajouter planning";
  constructor(private planningService: PlanningService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.planning = params['planning'];
    });
    if (this.planning != undefined) {
      this.titlePage = "Modifier un planning";
      this.titleButton = "Mis à jour planning";
      const planningUpdate: Planning = JSON.parse(this.planning) as unknown as Planning;
      this.selectedPlanning = planningUpdate;
      this.selectedPlanning.date=new Date(planningUpdate.date).toISOString().substring(0, 10);
    }
  }
  // Ajouter un planning
    addPlanning() {
      if(this.selectedPlanning.titre!="" && this.selectedPlanning.date!=""  ){
      const newPlanning = new Planning();
      newPlanning.titre= this.selectedPlanning.titre;
      newPlanning.date= this.selectedPlanning.date;
      var userAct=JSON.parse(localStorage.getItem('user'));
      var user=new User();
      user.id=userAct.id;
      user.firstname= userAct.firstname;
      user.lastname=userAct.lastname;
      user.email=userAct.email;
      user.role=userAct.role;
      newPlanning.user=user;
      newPlanning.description=this.selectedPlanning.description;
      if (this.planning != undefined) {
        const planningUpdate: Planning = JSON.parse(this.planning) as unknown as Planning;
        this.planningService.updatePlanning(planningUpdate.id,newPlanning).subscribe(
          response => {
            Swal.fire('Success', 'planning modifie avec succès.', 'success');
            this.router.navigate(['/planning']);
          },
          error => {
            console.error(error);
          }
        );
      }
      else
      this.planningService.createPlanning(newPlanning).subscribe(
        response => {
          Swal.fire('Success', 'planning ajoute avec succès.', 'success');
          this.router.navigate(['/planning']);
        },
        error => {
          console.error(error);
        }
      );}
      else{
        Swal.fire('Error', 'Veuillez vérifier vos données.', 'error');
      }
    }
    returnPlanning(){
      this.router.navigate(['/planning']);
    }
}


