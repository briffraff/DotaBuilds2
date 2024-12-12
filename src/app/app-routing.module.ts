import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { HeroesComponent } from '../components/heroes/heroes.component';
import { ItemsComponent } from '../components/items/items.component';
import { BuildCreatorComponent } from '../components/build-creator/build-creator.component';
import { ProfileComponent } from '../components/profile/profile.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'build-creator', component: BuildCreatorComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
