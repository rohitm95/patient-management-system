import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PatientService } from '../../shared/services/patient.service';
import { Patient } from '../../models/patient.model';
import { MatPaginator, MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  	selector: 'app-dashboard',
  	templateUrl: './dashboard.component.html',
  	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

    patientDetails: any;
    patientList: Patient[];
  	dataSource = new MatTableDataSource();
    displayedColumns: string[] = ['serialNo', 'patientId', 'name', 'mobile', 'actions'];

    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;

  	constructor(private patientService: PatientService, public dialog: MatDialog) { }

  	ngOnInit() { }
      
    ngAfterViewInit() {
        this.getPatientsList();  
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

  	getPatientsList() {
    	let data = this.patientService.getPatients();
        data.subscribe(patient => {
            this.patientList = [];
            patient.forEach(element => {
                let json = element.payload.doc.data();
                json["id"] = element.payload.doc.id;
                this.patientList.push(json as Patient);
            });
            this.dataSource.data = this.patientList;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        });
  	}

    deletePatientDetails(id) {
        const dialogRef = this.dialog.open(DialogContentDeleteDialog);

        dialogRef.afterClosed().subscribe(result => {
          if (result === true) {
                this.patientService.deletePatient(id).then(res => {
                    this.dialog.open(DialogContentSuccessDialog, {
                        width: '100px'
                    });
                });
            }
        });
    }

    viewPatientDetails(id) {
        this.patientService.getPatientDetails(id).subscribe((res: any) => {
            this.patientDetails = res;
            this.dialog.open(DialogContentViewDialog, {
                data: { patientId: res.patientId, name: res.name, mobile: res.mobile }
            });
        });
    }

    insertPatientDetails() {
        const dialogRef = this.dialog.open(DialogContentInsertDialog);
    }

    getPatientDetails(id) {
      	this.patientService.getPatientDetails(id).subscribe((res: any) => {
            this.patientDetails = res;
            this.dialog.open(DialogContentEditDialog, {
                data: {id: id, patientId: res.patientId, name: res.name, mobile: res.mobile},
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
    constructor(public dialogRef: MatDialogRef<DialogContentSuccessDialog>) { }
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
    nameAlert = 'You must enter a value';
    mobileAlert = 'You must enter 10 digits';
    idAlert = 'You must enter the ID';
    patientId: number;
    name: any;
    mobile: any;
    post: any;

    constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogContentInsertDialog>,
    public dialog: MatDialog, private patientService: PatientService){
        this.insertForm = fb.group({
            'patientId': [null, Validators.required],
            'name': [null, Validators.required],
            'mobile': [null, Validators.compose([Validators.required, Validators.maxLength(10)])]
        });
    }
    insertData(post) {
        let data = {
            patientId: post.patientId,
            name: post.name,
            mobile: post.mobile
        };
        this.patientService.insertPatientDetails(data).then(res => {
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
    nameAlert = 'Please fill the details';
    mobileAlert = 'Please enter 10 digits';
    patientId: number;
    name: any;
    mobile: any;
    post: any;
    patientDetails: any;

    constructor(
    private fb: FormBuilder, public dialogRef: MatDialogRef<DialogContentEditDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Patient, private patientService: PatientService, public dialog: MatDialog) {
    	this.editForm = fb.group({
            'patientId': new FormControl({value: data.patientId, disabled: true}),
            'name': ['', Validators.required],
            'mobile': ['', Validators.compose([Validators.required, Validators.maxLength(10), Validators.minLength(10)])]
        });
        this.editForm.get('patientId').patchValue(data.patientId);
        this.editForm.get('name').patchValue(data.name);
        this.editForm.get('mobile').patchValue(data.mobile);
        this.patientId = data.patientId;
    }

    updateData(post, id) {
      	let data = {
            patientId: this.patientId,
            name: post.name,
            mobile: post.mobile
        };
        this.patientService.updatePatientDetails(data, id).then((res: any) => {
        	this.dialog.open(DialogContentSuccessDialog);
        });
    }
}
