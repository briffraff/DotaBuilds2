import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.Login);
  }
}
