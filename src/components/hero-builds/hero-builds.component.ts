import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';

@Component({
  selector: 'app-hero-builds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-builds.component.html',
  styleUrl: './hero-builds.component.scss'
})
export class HeroBuildsComponent {
  builds = [];
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.Builds);
  }
}
