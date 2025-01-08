import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { FirebaseAuthService } from '../../service/firebase/firebaseAuth.service';
import { FirestoreService } from '../../service/firebase/firestore.service';
import { CommonModule } from '@angular/common';
import { DotaService } from '../../service/dota2/dota2.service';
import { RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './profile.component.html',
    styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
    user: any
    buildsByUser: any;

    constructor(
        private titleService: Title,
        private authService: FirebaseAuthService,
        private firestoreService: FirestoreService,
        private dotaService: DotaService,
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(titles.Profile);

        this.authService.getFirestoreUser().pipe(
            switchMap((user) => {
                this.user = user;
                if (this.user?.uid) {
                    return this.firestoreService.getAllBuildsByUserId(this.user.uid);
                }
                return [];
            })
        ).subscribe((builds) => {
            this.buildsByUser = builds;
        });
    }

    setPlayerPositionInfo() {
        const positionId = this.user?.playerPosition;
        const positions = this.dotaService.getPositions()
        return `${positionId} | ${positions.find(pos => pos.id == positionId)?.desc}`;
    }
}

