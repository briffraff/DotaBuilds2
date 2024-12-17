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
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { HeroDetailsComponent } from '../components/heroes/hero-details/hero-details.component';
import { ItemDetailsComponent } from '../components/items/item-details/item-details.component';
import { BuildDetailsComponent } from '../components/hero-builds/build-details/build-details.component';
import { AuthGuard } from '../service/auth.guard';
import { GuestGuard } from '../service/guest.guard';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'heroes/:id', component: HeroDetailsComponent },
    { path: 'items', component: ItemsComponent },
    { path: 'items/:id', component: ItemDetailsComponent },
    { path: 'builds', component: HeroBuildsComponent },
    { path: 'builds/:id', component: BuildDetailsComponent },
    { path: 'build-creator', component: BuildCreatorComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
