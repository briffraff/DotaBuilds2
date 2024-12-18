import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FirestoreService } from '../../service/firebase/firestore.service';

@Component({
    selector: 'app-build-creator',
    standalone: true,
    imports: [RouterModule, CommonModule, ReactiveFormsModule],
    templateUrl: './build-creator.component.html',
    styleUrl: './build-creator.component.scss'
})
export class BuildCreatorComponent {
    buildCreatorForm: FormGroup;
    error: string = '';
    isSubmitting: boolean = false;
    items: { visible: boolean }[] = [];

    constructor(
        private titleService: Title,
        private fb: FormBuilder,
        private router: Router,
        private firestoreService: FirestoreService
    ) {
        this.buildCreatorForm = this.fb.group({
            heroName: ['', [Validators.minLength(3), Validators.required]],
            heroImage: ['', [Validators.required]],
            itemName0: [''],
            itemImage0: [''],
            itemName1: [''],
            itemImage1: [''],
            itemName2: [''],
            itemImage2: [''],
            itemName3: [''],
            itemImage3: [''],
            itemName4: [''],
            itemImage4: [''],
            itemName5: [''],
            itemImage5: [''],
        });
    }

    ngOnInit(): void {
        this.titleService.setTitle(titles.BuildCreator);
    }

    addItem() {
        if (this.items.length < 6) {
            this.items.push({ visible: false });
        }
    }
    
    toggleVisibility(index: number) {
        this.items[index].visible = !this.items[index].visible;
    }

    async handleSubmit() {
        this.isSubmitting = true;

        try {
            await this.firestoreService.createBuild(this.buildCreatorForm.value);
            // console.log(this.buildCreatorForm.value);
            // console.log(this.items);
            this.buildCreatorForm.reset();
            this.error = '';
            this.router.navigate(['/builds']);
        } catch (error: any) {
            this.error = error.message;
        } finally {
            this.isSubmitting = false;
        }
    }

    countItems() {
        return 6 - this.items.length;
    }

}

