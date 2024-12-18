import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { FirestoreService } from '../../service/firebase/firestore.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../service/firebase/firebaseAuth.service';

@Component({
  selector: 'app-build-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './build-details.component.html',
  styleUrl: './build-details.component.scss'
})
export class BuildDetailsComponent {

  foundedBuild: any = {}
  isBuildOwner: boolean = false;

  constructor(
    private titleService: Title,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: FirebaseAuthService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.BuildDetails);
    this.handleBuildById();
  }

  async handleBuildById() {

    const buildId = this.route.snapshot.paramMap.get('id');

    if (buildId) {
      const buildById = await this.firestoreService.getBuildById(buildId);
      this.foundedBuild = buildById;

      if (!buildById) {
        return;
      }
      
      await this.isOwner(this.foundedBuild.creatorId);
    }

  }

  async updateBuild() {
    // const updatedBuilds = await this.firestoreService.getAllBuilds();
    // console.log(updatedBuilds);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  private async isOwner(creatorId: string) {
    const userId = this.authService.currentUser.uid;

    if (userId === creatorId) {
      this.isBuildOwner = true;
    }
  }

  async deleteBuild() {
    const buildId = this.route.snapshot.paramMap.get('id');

    if (!buildId) {
      return
    }

    await this.firestoreService.deleteBuild(buildId);
    this.router.navigate(['/builds'])
  }
}
