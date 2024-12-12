import { CommonModule } from '@angular/common';  // Импортирай CommonModule
import { Component } from '@angular/core';

@Component({
  selector: 'app-heroes',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  heroes = ['Anti-Mage', 'Axe', 'Bane', 'Bloodseeker'];
}
