import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule,MatButtonModule, MatDividerModule, MatIconModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  formSubmitted = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
     login: ['',Validators.required],
    password: ['',Validators.required],
    });
  }

  loginTemplate() {
    this.formSubmitted = true;

    if (this.loginForm.valid) {
      console.log('Form Value:', this.loginForm.value);
      console.log('Form Submitted:', this.formSubmitted);
      this.loginForm.reset();
      this.formSubmitted = false; // Resetando o estado de submissão do formulário
    }
  }
 
}
