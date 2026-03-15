import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly showWelcome = signal(false);
  protected readonly userName = signal('');

  protected readonly registerForm = this.fb.group({
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]],
    subscribeNews: [false]
  }, {
    validators: (group) => {
      const pass = group.get('password')?.value;
      const confirmPass = group.get('confirmPassword')?.value;
      return pass === confirmPass ? null : { notSame: true };
    }
  });

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      
      this.authService.register(userData as any).subscribe({
        next: (res) => {
          this.userName.set(res.user.name);
          this.showWelcome.set(true);
          
          setTimeout(() => {
            this.showWelcome.set(false);
            this.router.navigate(['/']); 
          }, 3000);
        },
        error: (err) => {
          console.error('Registration error', err);
          alert('Error al registrar: ' + (err.error?.message || 'Error de conexión con el servidor'));
        }
      });
    }
  }
}
