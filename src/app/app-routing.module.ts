import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { HeroesComponent } from '../components/heroes/heroes.component';
import { ItemsComponent } from '../components/items/items.component';
import { BuildCreatorComponent } from '../components/build-creator/build-creator.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { HeroBuildsComponent } from '../components/hero-builds/hero-builds.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'builds', component: HeroBuildsComponent },
    { path: 'build-creator', component: BuildCreatorComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
