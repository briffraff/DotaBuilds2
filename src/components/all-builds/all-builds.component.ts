import { Component } from '@angular/core';
import { titles } from '../../config/titles';
import { Title } from '@angular/platform-browser';
import { FirestoreService } from '../../service/firebase/firestore.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-builds',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-builds.component.html',
  styleUrl: './all-builds.component.scss'
})
export class AllBuildsComponent {

  allBuilds: any = [];

  constructor(
    private titlesService: Title,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {
    this.titlesService.setTitle(titles.AllBuilds)

    this.handleBuilds();
  }

  async handleBuilds() {
    const builds = await this.firestoreService.getAllBuilds();
    if (builds) {
      this.allBuilds = builds;
    }
  }
}
