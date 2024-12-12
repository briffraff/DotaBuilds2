import { Component } from '@angular/core';

@Component({
    selector: 'app-build-creator',
    standalone: true,
    imports: [],
    templateUrl: './build-creator.component.html',
    styleUrl: './build-creator.component.scss'
})
export class BuildCreatorComponent {
    buildName = '';
}