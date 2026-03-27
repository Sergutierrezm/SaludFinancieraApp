import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  username: string | null = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Al cargar el navbar, pedimos el nombre al navegador
    this.username = localStorage.getItem('currentUser');
  }

  onLogout() {
    // Limpiamos TODO para que el Interceptor deje de enviar las llaves
    localStorage.clear(); 
    this.router.navigate(['/login']);
  }
}
