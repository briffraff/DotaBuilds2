import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from '../service/firebase/firebase.service';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent , FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '';

  constructor(private service: FirebaseService) { }

  ngOnInit() {
    this.getField("appName").subscribe((fieldName: string) => {
      this.title = fieldName;
    });
  }

  getField(fieldName: string) {
    return this.service.readFieldFromFirstDocument("constants", fieldName);
  }
}
