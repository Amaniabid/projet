import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTESAdmin: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2  text-info', class: '' },
];
export const ROUTESMod: RouteInfo[] = [
  { path: '/reclamation', title: 'Réclamation',  icon:'fa fa-exclamation text-info', class: '' },
  { path: '/avis', title: 'Avis',  icon:'ni-satisfied text-info', class: '' },
  { path: '/annonce', title: 'Annonce',  icon:'ni-bell-55 text-info', class: '' },
  { path: '/event', title: 'Évènement',  icon:'ni-album-2 text-info', class: '' },


];
export const ROUTESUser: RouteInfo[] = [
  { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-info ', class: '' },
  { path: '/reclamation', title: 'Réclamation',  icon:'fa fa-exclamation text-info', class: '' },
  { path: '/avis', title: 'Avis',  icon:'ni-satisfied text-info', class: '' },
  { path: '/event', title: 'Évènement',  icon:'ni-album-2 text-info', class: '' },
  { path: '/groupe', title: 'Groupe',  icon:'fas fa-users text-info', class: '' },
  { path: '/planning', title: 'Planning',  icon:'fa fa-calendar text-info', class: '' },
  { path: '/accueil', title: 'Accueil',  icon:'fas fa-chart-bar text-info', class: '' },
  { path: '/main', title: 'Main',  icon:'fab fa-rocketchat', class: '' }


];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    var userAct=JSON.parse(localStorage.getItem('user'));
    if(userAct.role=="ADMIN")
      this.menuItems = ROUTESAdmin.filter(menuItem => menuItem);
    else if(userAct.role=="USER")
      this.menuItems = ROUTESUser.filter(menuItem => menuItem);
    else if(userAct.role=="MANAGER")
      this.menuItems = ROUTESMod.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
