import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

	constructor(public db: AngularFirestore) { }

	getPatients() {
		return this.db.collection('patients').snapshotChanges();
	}

	getPatientDetails(id) {
		return this.db.collection('patients').doc(id).valueChanges();
	}

	getPatientId(id) {
		return this.db.collection('patients').doc(id).snapshotChanges();
	}

	insertPatientDetails(data) {
		return this.db.collection('patients').add({
			name: data.name,
			mobile: data.mobile
		})
	}

	deletePatient(id) {
		return this.db.collection('patients').doc(id).delete();
	}

	updatePatientDetails(data, id) {
		return this.db.collection('patients').doc(id).set(data);
	}

	/*getPatientCredentials() : Observable<Patient[]> {
		return this.http.get<Patient[]>('http://localhost:3000/user/1');
	}*/

}
