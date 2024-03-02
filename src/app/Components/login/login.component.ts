import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../Service/login.service';
import { loginResponse } from '../../Response/Login/loginResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatSelectModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDividerModule, MatIconModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
redirectToRegister() {
  this.router.navigate(['/register']);
}

  loginForm!: FormGroup;
  formSubmitted = false;
  invalidCredentials = false;

  constructor(private fb: FormBuilder, private loginService: LoginService,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  loginTemplate() {
    if (this.loginForm.valid) {
      this.loginService.loginUser(this.loginForm).subscribe({
        next: response => {
          
          console.log('Login successful:', response);
          localStorage.setItem('jwt', response.token);
          this.router.navigate(['/dashboard']);
        },
        error: error => {
          console.error('Login failed:', error);
          this.invalidCredentials = true;
        }
      }

      );
    }
    else {
      console.log('Form is invalid. Please check your inputs.');
    }
  }
  }



  

