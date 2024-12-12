import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirebaseService } from '../service/firebase/firebase.service';

interface Constant {
  appName: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '';

  constructor(private service: FirebaseService) { }

  getField(fieldName: string) {
    this.service.readFieldFromFirstDocument("constants", fieldName).subscribe((fieldName: string) => {
      console.log(fieldName);
      this.title = fieldName;
    });
  }

  ngOnInit() {
    this.getField("appName");
  }
}
