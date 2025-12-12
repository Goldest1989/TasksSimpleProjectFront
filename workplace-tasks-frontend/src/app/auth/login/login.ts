import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class Login {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginError = 'Por favor, preencha todos os campos corretamente.';
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.loginError = null;
        this.router.navigate(['/tasks']);
      },
      error: err => {
        this.loginError = 'Usuário ou senha inválidos.';
        console.error(err);
      }
    });
  }
}
