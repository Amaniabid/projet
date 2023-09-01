import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Reclamation } from 'src/app/entities/reclamation';
import { User } from 'src/app/entities/user';
import { ReclamationService } from 'src/app/service/reclamation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reclamation-list',
  templateUrl: './reclamation-list.component.html',
  styleUrls: ['./reclamation-list.component.scss']
})
export class ReclamationListComponent implements OnInit {
  displayedColumns: string[] = ['title','description','statut','dateModification','dateCreation','actions'];
  dataSource: MatTableDataSource<Reclamation>;
  userAct:User=new User();
  constructor(private reclService: ReclamationService, private router: Router) {}
  ngOnInit() {
    this.userAct=JSON.parse(localStorage.getItem('user'));
    if(this.userAct.role=="MANAGER")
    this.reclService.getReclamationAll().subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
    else
    this.reclService.getReclamation(this.userAct.id).subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
  }
  addreclamation(){
    this.router.navigate(['/addreclamation']);
  }
  acceptreclamation(id){
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment accepté  cette reclamation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'accepté ',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete reclamation method
        this.reclService.updateAcceptReclamation(id).subscribe(
          () => {
            Swal.fire('Success', 'reclamation accepté  avec succès.', 'success');
            if(this.userAct.role=="MANAGER")
    this.reclService.getReclamationAll().subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
    else
    this.reclService.getReclamation(this.userAct.id).subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
          },
          (error) => {
            if(error.status==200)
            {
              Swal.fire('Success', 'reclamation accepté  avec succès.', 'success');
              if(this.userAct.role=="MANAGER")
    this.reclService.getReclamationAll().subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
    else
    this.reclService.getReclamation(this.userAct.id).subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
            }
            else
            Swal.fire('Error', 'Échec de l\'accepté  de l\'reclamation.', 'error');
          }
        );
      }
    });
  }
  editreclamation(reclamation){
    this.router.navigate(['/addreclamation'], { queryParams: { reclamation: JSON.stringify(reclamation) } });
  }
  deletereclamation(id){
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cette reclamation?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete reclamation method
        this.reclService.deleteReclamation(id).subscribe(
          () => {
            Swal.fire('Success', 'reclamation supprimé avec succès.', 'success');
            if(this.userAct.role=="MANAGER")
    this.reclService.getReclamationAll().subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
    else
    this.reclService.getReclamation(this.userAct.id).subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
          },
          (error) => {
            if(error.status==200)
            {
              Swal.fire('Success', 'reclamation supprimé avec succès.', 'success');
              if(this.userAct.role=="MANAGER")
    this.reclService.getReclamationAll().subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
    else
    this.reclService.getReclamation(this.userAct.id).subscribe(
      response => {
        const reclamation: Reclamation[] = response as unknown as Reclamation[];
        this.dataSource = new MatTableDataSource(reclamation);
      },
      error => {
        console.error(error);
      }
    )
            }
            else
            Swal.fire('Error', 'Échec de la suppression de l\'reclamation.', 'error');
          }
        );
      }
    });
  }
}