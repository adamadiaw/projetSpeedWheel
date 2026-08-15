import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="text-align:center; padding:50px;">
      <h1>Bienvenue sur SpeeedWheel</h1>
      <p>Vous êtes connecté !</p>
    </div>
  `
})
export class Home {}