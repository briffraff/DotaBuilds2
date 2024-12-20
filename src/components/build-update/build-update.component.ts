import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FirestoreService } from '../../service/firebase/firestore.service';
import { FirebaseAuthService } from '../../service/firebase/firebaseAuth.service';
import { titles } from '../../config/titles';

@Component({
  selector: 'app-build-update',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './build-update.component.html',
  styleUrl: './build-update.component.scss'
})
export class BuildUpdateComponent {
  originalBuild: any = {};
  isEditMode: boolean = true;
  editField: string = '';
  currentEditValue: string = '';

  foundedBuild: any = {}
  isBuildOwner: boolean = false;

  selectedItem: any = null;
  isPopupVisible: boolean = false;

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
      this.originalBuild = { ...buildById };

      if (!buildById) {
        return;
      }

      await this.isOwner(this.foundedBuild.creatorId);
    }

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

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;

    if (!this.isEditMode) {
      this.updateBuild();
    }
  }

  openEditPopup(item: any, field: string): void {
    this.selectedItem = item;
    this.editField = field;
    this.currentEditValue = item[field];
    this.isPopupVisible = true;
  }

  applyEdit(): void {
    if (this.selectedItem && this.editField) {
      this.selectedItem[this.editField] = this.currentEditValue;
      this.closePopup();
    }
  }

  closePopup(): void {
    this.selectedItem = null;
    this.editField = '';
    this.currentEditValue = '';
    this.isPopupVisible = false;
  }

  async updateBuild(): Promise<void> {

    // console.log(this.originalBuild);
    // console.log(this.foundedBuild);

    if (JSON.stringify(this.originalBuild) === JSON.stringify(this.foundedBuild)) {
      console.log('No changes detected. Update skipped.');
      this.router.navigate([`/builds/details/${this.foundedBuild.id}`]);
      return;
    }

    console.log("Changes detected. Updating...");
    await this.firestoreService.updateBuild(this.foundedBuild.id, this.foundedBuild);
    this.router.navigate([`/builds/details/${this.foundedBuild.id}`]);
  }
}
