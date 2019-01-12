import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	loginFlag: any = localStorage.getItem('loggedIn');
  	constructor(private router: Router) { }

  	ngOnInit() {
  	}

  	onLoggedout() {
      this.setLogout();
    	this.router.navigate(['/login']);
  	}

    setLogout(){
      localStorage.removeItem('loggedIn');
    }

}
