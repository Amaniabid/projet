import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})


  export class UserProfileComponent implements OnInit {
    constructor(private userService: UserService, private router: Router) {}
    fullName:string="";
    email:string="";
    prenom:string="";
    nom:string="";
    password:string="";

  ngOnInit() {
    var user=JSON.parse(localStorage.getItem('user'));
    this.fullName=user.lastname+" "+user.firstname;
    this.prenom=user.firstname;
    this.nom=user.lastname;
    this.email=user.email;
  }

  update(){
    var userAct=JSON.parse(localStorage.getItem('user'));
    var user=new User();
    user.firstname=this.prenom;
    user.lastname=this.nom;
    user.password=this.password;
    this.userService.updateUser(userAct.id,user).subscribe(
      response => {
        Swal.fire('Success', 'mise à jour de l\'utilisateur avec succès.', 'success');
        localStorage.clear();
        this.router.navigate(['/login']);
      },
      error => {
        console.error(error);
      }
    );
  }
 
}
