import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';

@Component({
  selector: 'app-build-details',
  standalone: true,
  imports: [],
  templateUrl: './build-details.component.html',
  styleUrl: './build-details.component.scss'
})
export class BuildDetailsComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.BuildDetails);
  }
}
