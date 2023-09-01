import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EventService } from 'src/app/service/event.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'startDate', 'endDate', 'description', 'location','actions'];
  dataSource: MatTableDataSource<Event>;
  constructor(private eventService: EventService, private router: Router) {}
  ngOnInit() {
    var userAct=JSON.parse(localStorage.getItem('user'));
    this.eventService.getEvents(userAct.id).subscribe(
      response => {
        const event: Event[] = response as unknown as Event[];
        this.dataSource = new MatTableDataSource(event);
      },
      error => {
        console.error(error);
      }
    )
  }
  addEvent(){
    this.router.navigate(['/addEvent']);
  }
  editUser(event){
    this.router.navigate(['/addEvent'], { queryParams: { event: JSON.stringify(event) } });
  }
  deleteUser(id){
    Swal.fire({
      title: 'Confirmation',
      text: 'Voulez-vous vraiment supprimer cet événement ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Call the delete event method
        this.eventService.deleteEvent(id).subscribe(
          () => {
            Swal.fire('Success', 'Événement supprimé avec succès.', 'success');
            var userAct=JSON.parse(localStorage.getItem('user'));
            this.eventService.getEvents(userAct.id).subscribe(
              response => {
                const event: Event[] = response as unknown as Event[];
                this.dataSource = new MatTableDataSource(event);
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