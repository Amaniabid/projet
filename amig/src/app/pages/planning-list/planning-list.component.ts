import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Planning } from 'src/app/entities/planning';
import { PlanningService } from 'src/app/service/planning.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planning-list',
  templateUrl: './planning-list.component.html',
  styleUrls: ['./planning-list.component.scss']
})
export class PlanningListComponent implements OnInit {
  displayedColumns: string[] = ['titre', 'description', 'date','actions'];
  dataSource: MatTableDataSource<Planning>;
  constructor(private planningService: PlanningService, private router: Router) {}
  ngOnInit() {
    var userAct=JSON.parse(localStorage.getItem('user'));
    this.planningService.getPlannings(userAct.id).subscribe(
      response => {
        const Planning: Planning[] = response as unknown as Planning[];
        this.dataSource = new MatTableDataSource(Planning);
      },
      error => {
        console.error(error);
      }
    )
  }
  addPlanning(){
    this.router.navigate(['/addPlanning']);
  }
  editPlanning(planning){
    this.router.navigate(['/addPlanning'], { queryParams: { planning: JSON.stringify(planning) } });
  }
  deletePlanning(id){
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cet Planning?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete Planning method
        this.planningService.deletePlanning(id).subscribe(
          () => {
            Swal.fire('Success', 'Planning supprimé avec succès.', 'success');
            var userAct=JSON.parse(localStorage.getItem('user'));
            this.planningService.getPlannings(userAct.id).subscribe(
              response => {
                const planning: Planning[] = response as unknown as Planning[];
                this.dataSource = new MatTableDataSource(planning);
              },
              error => {
                console.error(error);
              }
            )
          },
          (error) => {
            Swal.fire('Error', 'Échec de la suppression de l\'événement.', 'error');
          }
        );
      }
    });
  }
}