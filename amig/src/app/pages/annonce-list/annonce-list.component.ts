import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Annonce } from 'src/app/entities/annonce';
import { AnnonceService } from 'src/app/service/annonce.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-annonce-list',
  templateUrl: './annonce-list.component.html',
  styleUrls: ['./annonce-list.component.scss']
})
export class AnnonceListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'startDate', 'contact', 'location','actions'];
  dataSource: MatTableDataSource<Annonce>;
  constructor(private annonceService: AnnonceService, private router: Router) {}
  ngOnInit() {
    var userAct=JSON.parse(localStorage.getItem('user'));
    this.annonceService.getAnnonces(userAct.id).subscribe(
      response => {
        const annonce: Annonce[] = response as unknown as Annonce[];
        this.dataSource = new MatTableDataSource(annonce);
      },
      error => {
        console.error(error);
      }
    )
  }
  addAnnonce(){
    this.router.navigate(['/addAnnonce']);
  }
  editUser(annonce){
    this.router.navigate(['/addAnnonce'], { queryParams: { Annonce: JSON.stringify(annonce) } });
  }
  deleteUser(id){
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cet annonce?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete Annonce method
        this.annonceService.deleteAnnonce(id).subscribe(
          () => {
            Swal.fire('Success', 'Annonce supprimé avec succès.', 'success');
            var userAct=JSON.parse(localStorage.getItem('user'));
            this.annonceService.getAnnonces(userAct.id).subscribe(
              response => {
                const annonce: Annonce[] = response as unknown as Annonce[];
                this.dataSource = new MatTableDataSource(annonce);
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