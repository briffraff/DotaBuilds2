import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { DotaService } from '../../service/dota2/dota2.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  imports: [CommonModule],
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
      this.heroes = data;
      console.log(this.heroes);
    })
  }

  getHeroImage(name: string): string {
    return this.dotaService.getHeroImage(name)
  }
}
