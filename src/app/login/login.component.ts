import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm : FormGroup;
	post : any;
	uid : string;
	pass : string;
	userId: string;
	password: string;
	loggedIn : any;
  	titleAlert = 'Please fill this field';
  	flag: any;

  	constructor(private fb: FormBuilder, public router: Router) {
  		this.loginForm = fb.group({
  			'uid' : [null, Validators.required],
  			'pass' : [null, Validators.required]
  		});
  	}

  	ngOnInit() {
			this.getCredentials();
			this.userId = sessionStorage.getItem('uid');
  		this.password = sessionStorage.getItem('pass');
  	}

  	checkLogin(post) {
			//console.log(post.uid + ' ' +post.pass);
			//console.log
  		if(post.uid == this.userId && post.pass == this.password) {
  			this.loggedIn = true;
  			this.setLogin();
        	this.flag = false;
  			this.router.navigate(['/dashboard']);
  		}else{
        	this.flag = true;
      	}
  	}

  	setLogin(){
  		sessionStorage.setItem('loggedIn', this.loggedIn);
  	}

  	getCredentials(){
		sessionStorage.setItem('uid', 'admin');
		sessionStorage.setItem('pass', '123456');
  	}

    reset(){
      	this.flag = false;
    }

}
