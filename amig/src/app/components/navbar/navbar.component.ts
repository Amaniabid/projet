import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTESAdmin,ROUTESMod, ROUTESUser} from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  fullName:string="";
  public location: Location;
  constructor(location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    var user=JSON.parse(localStorage.getItem('user'));
    this.fullName=user.lastname+" "+user.firstname;
    if(user.role=="ADMIN")
      this.listTitles = ROUTESAdmin.filter(listTitle => listTitle);
    else if(user.role=="USER")
      this.listTitles = ROUTESUser.filter(listTitle => listTitle);
    else if(user.role=="MANAGER")
      this.listTitles = ROUTESMod.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

}
