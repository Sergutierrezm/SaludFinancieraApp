import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  // Añadimos CommonModule para el *ngIf y FormsModule para el [(ngModel)]
  imports: [CommonModule, FormsModule, HttpClientModule], 
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    // 1. Creamos la credencial Basic Auth
    const authHeader = 'Basic ' + btoa(`${this.username}:${this.password}`);
    const headers = new HttpHeaders({ Authorization: authHeader });

    // 2. Probamos contra tu backend (usamos /gastos como test de llaves)
    this.http.get('http://localhost:8080/gastos', { headers }).subscribe({
      next: () => {
        // 3. Si es correcto, guardamos en el navegador
        localStorage.setItem('authHeader', authHeader);
        localStorage.setItem('currentUser', this.username);
        
        // 4. Saltamos al dashboard
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {  // <--- Añadiendo ': any' o ': HttpErrorResponse' se calla el error
        this.errorMessage = 'Usuario o contraseña incorrectos';
        console.error('Login error:', err);
      }
    });
  }
}
