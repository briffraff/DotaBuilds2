import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.Register);
  }
}
