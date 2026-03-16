import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly showWelcome = signal(false);
  protected readonly userName = signal('');

  protected readonly loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [false]
  });

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      
      this.authService.login({ email: email!, password: password! }).subscribe({
        next: (res) => {
          this.userName.set(res.user.name);
          this.showWelcome.set(true);
          
          setTimeout(() => {
            this.showWelcome.set(false);
            this.router.navigate(['/home']);
          }, 3000);
        },
        error: (err) => {
          console.error('Login error', err);
          alert('Error al iniciar sesión: ' + (err.error?.message || 'Contraseña o email incorrectos'));
        }
      });
    }
  }
}
