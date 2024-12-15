import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';
import { DotaService } from '../../service/dota2/dota2.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './items.component.html',
  styleUrl: './items.component.scss'
})
export class ItemsComponent {
  items : any[] = [];

  constructor(
    private titleService: Title,
    private dotaService: DotaService
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(titles.Items);

    this.dotaService.getItems().subscribe((data) => {
      if (data && typeof data === 'object') {
        this.items = Object.values(data);
      } else {
        this.items = [];
      }
      console.log(this.items);
    });
  }

  getItemImage(imgUrl: string): string{
    return this.dotaService.getItemImage(imgUrl);
  }  
}
