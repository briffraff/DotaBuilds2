import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../../config/titles';
import { Hero } from './hero-details.model';
import { ActivatedRoute } from '@angular/router';
import { DotaService } from '../../../service/dota2/dota2.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent {
  hero: Hero | undefined;
  heroLore: string = '';
  heroAbilities: string[] = []
  heroFacets: string[] = []

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private dotaService: DotaService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.HeroDetails);

    const heroId = this.route.snapshot.paramMap.get('id');

    if (heroId) {
      this.dotaService.getHeroDetails(heroId).subscribe(data => {

        this.hero = data;

        const heroName: string | undefined = data?.name;

        if (heroName) {
          this.dotaService.getHeroAbilities(heroName).subscribe(abilities => {
            this.heroAbilities = [abilities[0]];
            this.heroFacets = [abilities[2]]
            // console.log(this.heroAbilities);
            // console.log(this.heroFacets);
          })

          this.dotaService.getHeroLore(heroName).subscribe(lore => {
            this.heroLore = lore;
            // console.log(this.heroLore);
          });
        }
      });
    }
  }

  getHeroImage(name: string): string {
    return this.dotaService.getHeroImage(name)
  }
}
