import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../../config/titles';

@Component({
  selector: 'app-hero-details',
  standalone: true,
  imports: [],
  templateUrl: './hero-details.component.html',
  styleUrl: './hero-details.component.scss'
})
export class HeroDetailsComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.HeroDetails);
  }
}
