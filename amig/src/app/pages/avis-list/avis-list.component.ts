import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Publication } from 'src/app/entities/publication';
import { AvisService } from 'src/app/service/avis.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-avis-list',
  templateUrl: './avis-list.component.html',
  styleUrls: ['./avis-list.component.scss']
})
export class AvisListComponent implements OnInit {
    displayedColumns: string[] = ['title', 'contenu','actions'];
    dataSource: MatTableDataSource<Publication>;
    constructor(private avisService: AvisService, private router: Router) {}
    ngOnInit() {
      var userAct=JSON.parse(localStorage.getItem('user'));
      this.avisService.getAvisByUser(userAct.id).subscribe(
        response => {
          const avis: Publication[] = response as unknown as Publication[];
          this.dataSource = new MatTableDataSource(avis);
        },
        error => {
          console.error(error);
        }
      )
    }
    addavis(){
      this.router.navigate(['/addavis']);
    }
    editAvis(avis){
      this.router.navigate(['/addavis'], { queryParams: { avis: JSON.stringify(avis) } });
    }
    deleteAvis(id){
      Swal.fire({
        title: 'Confirmation',
        text: 'Voulez-vous vraiment supprimer cette Avis?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the delete avis method
          this.avisService.deleteAvis(id).subscribe(
            () => {
              Swal.fire('Success', 'Avis supprimé avec succès.', 'success');
              var userAct=JSON.parse(localStorage.getItem('user'));
              this.avisService.getAvisByUser(userAct.id).subscribe(
                response => {
                  const avis: Publication[] = response as unknown as Publication[];
                  this.dataSource = new MatTableDataSource(avis);
                },
                error => {
                  console.error(error);
                }
              )
            },
            (error) => {
              if(error.status==200)
              {
                Swal.fire('Success', 'Avis supprimé avec succès.', 'success');
                var userAct=JSON.parse(localStorage.getItem('user'));
                this.avisService.getAvisByUser(userAct.id).subscribe(
                response => {
                  const avis: Publication[] = response as unknown as Publication[];
                  this.dataSource = new MatTableDataSource(avis);
                },
                error => {
                  console.error(error);
                }
              )
              }
              else
              Swal.fire('Error', 'Échec de la suppression de l\'Avis.', 'error');
            }
          );
        }
      });
    }
  }