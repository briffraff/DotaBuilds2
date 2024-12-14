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
  user: any;

  

  constructor(
    private titleService: Title,
    private firebaseAuthService: FirebaseAuthService,
    private firestoreService: FirestoreService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.AppName);

    this.firebaseAuthService.getCurrentUser().then(user => {
      if (user) {
        console.log(this.user);
        // this.firestoreService.getUserData(user.uid).then(data => {
        //   this.user = data;
        // })
      }
    });
  }
}
