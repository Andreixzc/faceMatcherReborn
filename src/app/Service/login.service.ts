import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { loginResponse } from '../Response/Login/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private Http: HttpClient) { }

  loginUrl = "https://api.theandrei.link/user/login";
  registerUrl = "https://api.theandrei.link/user";


  
  loginUser(formGroup: FormGroup) {
    const options = { headers: new HttpHeaders({ 'skipAuthCheck': 'true' }) };
    return this.Http.post<loginResponse>(this.loginUrl, formGroup.value, options);
  }
  register(formGroup: FormGroup){
    const options = { headers: new HttpHeaders({ 'skipAuthCheck': 'true' }) };
    formGroup.removeControl('confirmPassword');
    console.log(formGroup.value)
    return this.Http.post(this.registerUrl,formGroup.value,options);
  }
}
