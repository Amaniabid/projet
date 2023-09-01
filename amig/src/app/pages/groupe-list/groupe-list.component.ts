import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Group } from 'src/app/entities/group';
import { GroupeService } from 'src/app/service/groupe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-groupe-list',
  templateUrl: './groupe-list.component.html',
  styleUrls: ['./groupe-list.component.scss']
})
export class GroupeListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'members','actions'];
  dataSource: MatTableDataSource<Group>;
  constructor(private groupeService: GroupeService, private router: Router) {}
  ngOnInit() {
    var userAct=JSON.parse(localStorage.getItem('user'));
    this.groupeService.getGroupes(userAct.id).subscribe(
      response => {
        const groupe: Group[] = response as unknown as Group[];
        this.dataSource = new MatTableDataSource(groupe);
      },
      error => {
        console.error(error);
      }
    )
  }
  addGroupe(){
    this.router.navigate(['/addGroupe']);
  }
  editGroupe(groupe){
    this.router.navigate(['/addGroupe'], { queryParams: { groupe: JSON.stringify(groupe) } });
  }
  deleteGroupe(id){
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cet Groupe?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete Groupe method
        this.groupeService.deleteGroupe(id).subscribe(
          () => {
            Swal.fire('Success', 'Groupe supprimé avec succès.', 'success');
            var userAct=JSON.parse(localStorage.getItem('user'));
            this.groupeService.getGroupes(userAct.id).subscribe(
              response => {
                const Groupe: Group[] = response as unknown as Group[];
                this.dataSource = new MatTableDataSource(Groupe);
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