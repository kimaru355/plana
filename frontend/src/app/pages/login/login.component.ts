import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../interfaces/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  showMessage: boolean = false;
  isOrganizer: boolean = false;
  role: 'user' | 'organizer' | 'admin' = 'user';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    this.isOrganizer = this.activatedRoute.snapshot.url
      .map((url) => url.path)
      .includes('organizer');
    if (this.isOrganizer) {
      this.role = 'organizer';
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  changeRole(event: any) {
    this.role = event.target.value;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user_login: UserLogin = this.loginForm.value;
      this.authService.login(user_login, this.role).subscribe((response) => {
        if (!response.success || !response.data) {
          this.errorMessage = response.message;
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
            this.successMessage = '';
            this.errorMessage = '';
          }, 2000);
          return;
        }
        this.successMessage = response.message;
        this.showMessage = true;
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        setTimeout(() => {
          this.showMessage = false;
          this.successMessage = '';
          this.errorMessage = '';
          if (response.data?.role === 'user') {
            this.router.navigate(['events']);
          } else if (
            response.data?.role === 'organizer' ||
            response.data?.role === 'admin'
          ) {
            this.router.navigate(['/dashboard/analytics']);
          }
        }, 2000);
      });
    }
  }
}
