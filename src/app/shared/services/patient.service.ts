import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

	constructor(private db: AngularFirestore) { }

	getPatients() {
		return this.db.collection('patients').snapshotChanges();
	}

	getPatientDetails(id) {
		return this.db.collection('patients').doc(id).valueChanges();
	}

	insertPatientDetails(data) {
		return this.db.collection('patients').add({
			patientId: data.patientId,
			name: data.name,
			mobile: data.mobile
		});
	}

	deletePatient(id) {
		return this.db.collection('patients').doc(id).delete();
	}

	updatePatientDetails(data, id) {
		return this.db.collection('patients').doc(id).set(data);
	}

}
