import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { titles } from '../../config/titles';

@Component({
    selector: 'app-build-creator',
    standalone: true,
    imports: [],
    templateUrl: './build-creator.component.html',
    styleUrl: './build-creator.component.scss'
})
export class BuildCreatorComponent {
    constructor(
        private titleService: Title
    ) { }

    ngOnInit(): void {
        this.titleService.setTitle(titles.BuildCreator);
    }
}