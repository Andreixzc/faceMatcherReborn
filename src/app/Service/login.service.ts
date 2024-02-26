import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { loginResponse } from '../Response/Login/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private Http: HttpClient) { }

  loginUrl = "http://localhost:9090/user/login";


  
  loginUser(formGroup: FormGroup) {
    console.log(formGroup.value);
    const options = { headers: new HttpHeaders({ 'skipAuthCheck': 'true' }) };
    return this.Http.post<loginResponse>(this.loginUrl, formGroup.value, options);
  }
}
