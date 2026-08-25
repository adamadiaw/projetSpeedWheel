import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  isLoggedIn = signal(false);
  isDarkMode = signal(false);

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn.set(!!this.authService.getToken());
  }

  ngOnInit(): void {
    // Détecter les changements de route pour mettre à jour l'état de connexion
    this.router.events.subscribe(() => {
      this.isLoggedIn.set(!!this.authService.getToken());
      this.isDarkMode.set(document.body.classList.contains('dark'));
    });
  }

  toggleTheme(): void {
    this.isDarkMode.set(!this.isDarkMode());
    document.body.classList.toggle('dark', this.isDarkMode());
  }

  handleAuth(): void {
    if (this.isLoggedIn()) {
      this.authService.logout();
      this.isLoggedIn.set(false);
      window.location.href = '/login';
    } else {
      this.authService.saveToken('');
      window.location.href = '/login';
    }
  }
}