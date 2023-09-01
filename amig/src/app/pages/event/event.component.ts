import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/service/event.service';
import { Event } from 'src/app/entities/event';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/entities/user';




@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit{
    id: string;
    eventtitre: string;
    eventDate: string;
    eventDatefin: string;
    eventdescription: string;
    eventattendees: any[];
    eventLocation: string;
    eventCreated: boolean = false;
    modeEdition: boolean = false;
    titlePage="Ajouter un événement";
    titleButton="Ajouter événement";
    event:string;
    constructor(private eventService: EventService, private router: Router,private route: ActivatedRoute) {}
    ngOnInit(): void {
      this.route.queryParams.subscribe(params => {
        this.event = params['event'];
      });
      if (this.event != undefined) {
        this.titlePage = "Modifier un événement";
        this.titleButton = "Mis à jour événement";
        const eventUpdate: Event = JSON.parse(this.event) as unknown as Event;
        this.eventtitre = eventUpdate.title;
    
        // Convert start date to the correct format
        const startDate = new Date(eventUpdate.startDate);
        this.eventDate = startDate.toISOString().substring(0, 10);
    
        // Convert end date to the correct format
        const endDate = new Date(eventUpdate.endDate);
        this.eventDatefin = endDate.toISOString().substring(0, 10);
    
        this.eventdescription = eventUpdate.description;
        this.eventattendees = eventUpdate.attendees;
        this.eventLocation = eventUpdate.location;
      }
    }
  
    createEvent() {
      if(this.eventtitre!="" && this.eventDate!="" && this.eventDatefin!="" && this.eventdescription!=""  && this.eventLocation!=""  ){
      const event = new Event();
      event.title=this.eventtitre;
      event.startDate=this.eventDate;
      event.endDate=this.eventDatefin;
      event.description=this.eventdescription;
      event.attendees=this.eventattendees;
      event.location=this.eventLocation;
      var userAct=JSON.parse(localStorage.getItem('user'));
      var user=new User();
      user.id=userAct.id;
      user.firstname= userAct.firstname;
      user.lastname=userAct.lastname;
      user.email=userAct.email;
      user.role=userAct.role;
      event.user=user;
      if (this.event != undefined) {
      const eventUpdate: Event = JSON.parse(this.event) as unknown as Event;
      this.eventService.updateEvent(eventUpdate.id,event).subscribe(
        response => {
          Swal.fire('Success', 'événement modifie avec succès.', 'success');
          this.router.navigate(['/event']);
        },
        error => {
          console.error(error);
        }
      );
      }
      else
      this.eventService.createEvent(event).subscribe(
        response => {
          Swal.fire('Success', 'événement ajoute avec succès.', 'success');
          this.router.navigate(['/event']);
        },
        error => {
          console.error(error);
        }
      );}
      else{
        Swal.fire('Error', 'Veuillez vérifier vos données.', 'error');
      }
    }
    returnEvent(){
      this.router.navigate(['/event']);
    }
  }
    
  
  
