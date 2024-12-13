import { CommonModule } from '@angular/common';  // Импортирай CommonModule
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';

@Component({
  selector: 'app-heroes',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  heroes = ['Anti-Mage', 'Axe', 'Bane', 'Bloodseeker'];

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.Heroes);
  }

}
