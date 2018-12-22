import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../shared/services/patient.service';

import { Patient } from '../../models/patient.model';

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  	selector: 'app-dashboard',
  	templateUrl: './dashboard.component.html',
  	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    patientDetails: any;
  	dataSource = new MatTableDataSource();
  	displayedColumns: string[] = ['serialNo', 'name', 'mobile', 'actions'];


  	@ViewChild(MatPaginator) paginator: MatPaginator;

  	constructor(private patientService: PatientService, public dialog: MatDialog, private router: Router) { }

  	ngOnInit() {
	   	this.showPatients();
	   	this.dataSource.paginator = this.paginator;
  	}

  	showPatients() {
    	this.patientService.getPatients().subscribe((res: any) => {
      		this.dataSource.data = res;
    	});
  	}

    deletePatientDetails(id) {
        const dialogRef = this.dialog.open(DialogContentDeleteDialog);

        dialogRef.afterClosed().subscribe(result => {
          if(result == true)
            this.patientService.deletePatient(id).subscribe(res => {
                this.dialog.open(DialogContentSuccessDialog, {
                	width: '100px'
                });
            });
        });
    }

    seePatientDetails(id) {
        this.patientService.getPatientDetails(id).subscribe((res: any) => {
            this.patientDetails = res;
            this.dialog.open(DialogContentViewDialog, {
                data: {id: res.id, name: res.name, mobile: res.mobile},
            });
        });
    }

    insertPatientDetails() {
        const dialogRef = this.dialog.open(DialogContentInsertDialog, {
        	width: '325px'
        });
    }

    getPatientDetails(id){
      	this.patientService.getPatientDetails(id).subscribe((res: any) => {
            this.patientDetails = res;
            this.dialog.open(DialogContentEditDialog, {
                data: {id: res.id, name: res.name, mobile: res.mobile},
                width: '325px'
            });
        });
    }

}


@Component({
  	selector: 'dialog-content-delete-dialog',
  	templateUrl: 'dialog-content-delete-dialog.html',
})
export class DialogContentDeleteDialog {
    constructor(public dialogRef: MatDialogRef<DialogContentDeleteDialog>){}
}

@Component({
  	selector: 'dialog-content-success-dialog',
  	templateUrl: 'dialog-content-success-dialog.html',
})
export class DialogContentSuccessDialog {
    constructor(public dialogRef: MatDialogRef<DialogContentSuccessDialog>){}
    reload(){
    	window.location.reload();
    }
}

@Component({
  	selector: 'dialog-content-view-dialog',
  	templateUrl: 'dialog-content-view-dialog.html',
})
export class DialogContentViewDialog {
    constructor(
    public dialogRef: MatDialogRef<DialogContentViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Patient) {}
}

@Component({
  	selector: 'dialog-content-insert-dialog',
  	templateUrl: 'dialog-content-insert-dialog.html',
})
export class DialogContentInsertDialog {
    insertForm: FormGroup;
    titleAlert = 'Please fill the detail';
    mobileAlert = 'Please enter 10 digits';
    name: any;
    mobile: any;
    post: any;

    constructor(private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<DialogContentInsertDialog>,
    public dialog: MatDialog, private patientService: PatientService){
        this.insertForm = fb.group({
            'name': [null, Validators.required],
            'mobile': [null, Validators.compose([Validators.required, Validators.maxLength(10)])]
        });
    }
    insertData(post) {
        let data = {
            name: post.name,
            mobile: post.mobile
        };
        console.log(data);
        this.patientService.insertPatientDetails(data).subscribe(res =>{
            this.dialog.open(DialogContentSuccessDialog);
        });
    }

}

@Component({
  	selector: 'dialog-content-edit-dialog',
  	templateUrl: 'dialog-content-edit-dialog.html',
})
export class DialogContentEditDialog {
	editForm: FormGroup;
    titleAlert = 'Please fill the detail';
    mobileAlert = 'Please enter 10 digits';
    name: any;
    mobile: any;
    post: any;
    patientDetails: any;

    constructor(
    private fb: FormBuilder, private router: Router, public dialogRef: MatDialogRef<DialogContentEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Patient, private patientService: PatientService, public dialog: MatDialog) {
    	this.editForm = fb.group({
            'name': ['', Validators.required],
            'mobile': ['', Validators.compose([Validators.required, Validators.maxLength(10)])]
        });
        this.editForm.get('name').patchValue(data.name);
        this.editForm.get('mobile').patchValue(data.mobile);
    }

    getPatientDetails(id){
      	this.patientService.getPatientDetails(id).subscribe((res: any) => {
            this.patientDetails = res;
            this.dialog.open(DialogContentEditDialog, {
                data: {id: res.id, name: res.name, mobile: res.mobile}
            });
        });
    }

    updateData(post, id){
      	let data = {
            name: post.name,
            mobile: post.mobile
        };
        this.patientService.updatePatientDetails(data, id).subscribe((res: any) => {
        	this.dialog.open(DialogContentSuccessDialog);
        });
    }
}