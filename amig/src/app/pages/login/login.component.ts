import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {
    email: string;
    password: string;
  
    constructor(private authService: AuthService, private router: Router) {}
  
    login() {
      var payload = {
        email: this.email,
        password: this.password,
      };
  
      this.authService.login(payload).subscribe(response => {
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
        
    
        // Ajoutez la redirection vers la page de chat ici
        this.router.navigate(['/chat']); 
        if(response.user.role=="ADMIN")
          this.router.navigate(['/dashboard']); 
        else if(response.user.role=="USER")
          this.router.navigate(['/user-profile']); 
        else if(response.user.role=="MANAGER")
          this.router.navigate(['/reclamation']); 
      });
    }
    register(){
      this.router.navigate(['/register']);
    }
  }
