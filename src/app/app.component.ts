import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { titles } from '../config/titles';
import { FirestoreService } from '../service/firebase/firestore.service';
import { FirebaseAuthService } from '../service/firebase/firebaseAuth.service';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private titleService: Title,
    private authService: FirebaseAuthService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.AppName);
  }
}
