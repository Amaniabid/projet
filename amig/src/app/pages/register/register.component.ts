import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';
import { AuthService } from 'src/app/service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  nom: string="";
  prenom: string="";
  email: string="";
  password: string="";
  condition: boolean=false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }
  register(){
    if(this.condition)
    {
      if(this.prenom!="" && this.nom!="" && this.email!="" && this.password!="")
      {
        var user=new User();
        user.firstname=this.prenom;
        user.lastname=this.nom;
        user.email=this.email;
        user.password=this.password;
        this.authService.register(user).subscribe(
          response => {
            Swal.fire('Success', 'register avec succès.', 'success');
            this.router.navigate(['/login']);
          },
          error => {
            Swal.fire('Error', error.error.access_token, 'error');
            console.error(error);
          }
        );
      }
      else{
        Swal.fire('Error', 'Veuillez vérifier vos données.', 'error');
      }
    }
    else{
      Swal.fire('Error', 'il faut cocher politique de confidentialité', 'error');
    }
  }
}
