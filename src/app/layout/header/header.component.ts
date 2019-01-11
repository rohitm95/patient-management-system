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
    	this.loginFlag = sessionStorage.getItem('loggedIn');
    	console.log(this.loginFlag);
  	}

  	onLoggedout() {
      this.setLogout();
    	this.router.navigate(['/login']);
      console.log(this.loginFlag);
  	}

    setLogout(){
      localStorage.removeItem('loggedIn');
      window.location.reload();
    }

}
