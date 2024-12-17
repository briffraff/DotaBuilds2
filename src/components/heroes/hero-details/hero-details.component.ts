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
  heroAbilities: any = [];

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private dotaService: DotaService
  ) { };

  ngOnInit(): void {
    this.titleService.setTitle(titles.HeroDetails);

    const heroId = this.route.snapshot.paramMap.get('id');

    if (heroId) {
      this.dotaService.getHeroDetails(heroId).subscribe(data => {

        this.hero = data;

        const heroName: string | undefined = data?.name;

        if (heroName) {
          this.dotaService.getHeroAbilities(heroName).subscribe(data => {
            this.heroAbilities = data;
            // console.log(this.heroAbilities);
          })

          this.dotaService.getHeroLore(heroName).subscribe(lore => {
            this.heroLore = lore;
            // console.log(this.heroLore);
          });
        }
      });
    }
  }

  setIcons() {
    const cdnPath = `${this.dotaService.cdnAkamaiUrlWeb}/apps/dota2/images/dota_react`;

    const Icons = {
      hero_str: `${cdnPath}/icons/hero_strength.png`,
      hero_int: `${cdnPath}/icons/hero_intelligence.png`,
      hero_agi: `${cdnPath}/icons/hero_agility.png`,
      hero_damage: `${cdnPath}/heroes/stats/icon_damage.png`,
      attack_time: `${cdnPath}/heroes/stats/icon_attack_time.png`,
      hero_attack_range: `${cdnPath}/heroes/stats/icon_attack_range.png`,
      hero_proj_speed: `${cdnPath}/heroes/stats/icon_projectile_speed.png`,
      hero_armor: `${cdnPath}/heroes/stats/icon_armor.png`,
      hero_magic_resist: `${cdnPath}/heroes/stats/icon_magic_resist.png`,
      hero_move_speed: `${cdnPath}/heroes/stats/icon_movement_speed.png`,
      hero_turn_rate: `${cdnPath}/heroes/stats/icon_turn_rate.png`,
      hero_vision: `${cdnPath}/heroes/stats/icon_vision.png`,
    };

    return Icons;
  }

  getHeroImage(name: string): string {
    return this.dotaService.getHeroImage(name)
  }

  setAbilityImage(imgUrl: string): string {
    return this.dotaService.getItemImage(imgUrl);
  }

  modifyPrimaryAttribute(attribute: string) {
    const iconsPath = '/apps/dota2/images/dota_react/icons';
    const icons: { [key: string]: { name: string; image: string } } = {
      str: { name: "Strength", image: `${this.dotaService.cdnAkamaiUrlWeb}${iconsPath}/hero_strength.png` },
      int: { name: "Intelligence", image: `${this.dotaService.cdnAkamaiUrlWeb}${iconsPath}/hero_intelligence.png` },
      agi: { name: "Agility", image: `${this.dotaService.cdnAkamaiUrlWeb}${iconsPath}/hero_agility.png` },
      all: { name: "Universal", image: `${this.dotaService.cdnAkamaiUrlWeb}${iconsPath}/hero_universal.png` },
    };

    if (!attribute || !icons[attribute]) {
      return;
    }

    return icons[attribute];
  }

  modifyAttackType(atackType: string) {
    const iconsPath = '/apps/dota2/images/dota_react/icons';
    const icons: { [key: string]: { name: string; image: string } } = {
      Melee: { name: "Melee", image: `${this.dotaService.cdnAkamaiUrlWeb}${iconsPath}/melee.svg` },
      Ranged: { name: "Ranged", image: `${this.dotaService.cdnAkamaiUrlWeb}${iconsPath}/ranged.svg` },
    };

    if (!atackType || !icons[atackType]) {
      return;
    }

    return icons[atackType];
  }

}
