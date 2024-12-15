import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  welcome = 'Welcome'
  appName = 'Dota Builds 2'
  
  topSectionBg = "/images/slark.jpg";
  feature1Bg = '/images/f1.jpg';
  feature2Bg = '/images/f2.jpg';
  feature3Bg = '/images/f3.jpg';

  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.Home);
  }
}
