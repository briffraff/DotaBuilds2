import { Component } from '@angular/core';
import { titles } from '../../config/titles';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-all-builds',
  standalone: true,
  imports: [],
  templateUrl: './all-builds.component.html',
  styleUrl: './all-builds.component.scss'
})
export class AllBuildsComponent {

  constructor(
    private titlesService: Title
  ) { }

  ngOnInit() {
    this.titlesService.setTitle(titles.AllBuilds)
  }
}
