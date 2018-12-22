import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

	private serviceUrl = 'http://localhost:3000/patients';
	private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

	constructor(private http: HttpClient) { }

	getPatients() : Observable<Patient[]> {
		return this.http.get<Patient[]>(this.serviceUrl);
	}

	getPatientDetails(id) : Observable<Patient[]> {
		return this.http.get<Patient[]>(this.serviceUrl+"/get/"+id);
	}

	insertPatientDetails(data) : Observable<Patient[]>{
		return this.http.post<Patient[]>(this.serviceUrl+"/create", data, this.httpOptions);
	}

	deletePatient(id) : Observable<Patient[]>{
		return this.http.delete<Patient[]>(this.serviceUrl+"/delete/"+id, this.httpOptions);
	}

	updatePatientDetails(data,id) : Observable<Patient[]>{
		return this.http.put<Patient[]>(this.serviceUrl+"/update/"+id, data, this.httpOptions);
	}

	/*getPatientCredentials() : Observable<Patient[]> {
		return this.http.get<Patient[]>('http://localhost:3000/user/1');
	}*/

}
