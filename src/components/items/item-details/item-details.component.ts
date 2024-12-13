import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../../config/titles';


@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.scss'
})
export class ItemDetailsComponent {
  constructor(
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.ItemDetails);
  }
}
