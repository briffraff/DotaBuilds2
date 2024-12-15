import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FirebaseAuthService } from '../../service/firebase/firebaseAuth.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
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

  user: any;

  constructor(
    private titleService: Title,
    private authService: FirebaseAuthService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.Home);
    this.user = this.authService.firestoreUserInfo;
    console.log(this.user);
  }

  get isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}
