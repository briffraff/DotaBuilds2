import { Component, OnInit } from '@angular/core';
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
export class BuildDetailsComponent implements OnInit {

  foundedBuild: any = {}
  isBuildOwner: boolean = false;

  isDelete: boolean = false;
  isDeletePopupVisible: boolean = false;

  isAuthenticated: boolean = false;

  constructor(
    private titleService: Title,
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: FirebaseAuthService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.BuildDetails);
    
    this.authService.isAuthenticated().subscribe((isAuth) => {
      this.isAuthenticated = isAuth;
    });

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


  private async isOwner(creatorId: string) {
    let userId: string | undefined = '';

    this.authService.getCurrentUser().subscribe((user) => {
      userId = user?.uid;
    });

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

  openDeletePopup() {
    this.isDeletePopupVisible = true;
  }

  applyDelete(): void {
    this.isDelete = true;

    if (this.isDelete) {
      this.deleteBuild();
      this.isDeletePopupVisible = false;
    }
  }

  closeDeletePopup(): void {
    this.isDeletePopupVisible = false;
  }
}
