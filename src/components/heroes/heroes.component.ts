import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { DotaService } from '../../service/dota2/dota2.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  heroes: any[] = [];

  constructor(
    private titleService: Title,
    private dotaService: DotaService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.Heroes);

    this.dotaService.getHeroes().subscribe((data) => {
      if (data && typeof data === 'object') {
        this.heroes = Object.values(data);
      } else {
        this.heroes = [];
      }
      // console.log(this.heroes);
    })
  }

  getHeroImage(name: string): string {
    return this.dotaService.getHeroImage(name)
  }
}
