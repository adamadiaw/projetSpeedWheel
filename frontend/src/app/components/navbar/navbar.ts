import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  isLoggedIn = signal(false);
  isDarkMode = signal(false);

  constructor(private authService: AuthService) {
    this.isLoggedIn.set(!!this.authService.getToken());
    this.isDarkMode.set(document.body.classList.contains('dark'));
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