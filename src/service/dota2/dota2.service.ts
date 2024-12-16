import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { addDoc, collection, getDocs, query, where, Firestore } from '@angular/fire/firestore';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Hero } from '../../components/heroes/hero-details/hero-details.model';

@Injectable({
    providedIn: 'root',
})
export class DotaService {
    private apiUrl = 'https://api.opendota.com/api';
    private cdnCloudflareUrl = 'https://cdn.cloudflare.steamstatic.com';
    private cdnAkamaiUrl = 'https://steamcdn-a.akamaihd.net';
    private heroesPath = '/constants/heroes';
    private loresPath = '/constants/hero_lore';
    private itemsPath = '/constants/items';
    private heroAbilitiesPath = '/constants/hero_abilities';

    constructor(private http: HttpClient) { }

    getHeroes(): Observable<any> {
        return this.http.get(`${this.apiUrl}${this.heroesPath}`);
    }

    getHeroImage(heroName: string): string {
        const formattedName = heroName.replace('npc_dota_hero_', '');
        return this.getHeroImageCdnUrl("cloudflare", formattedName);
    }

    getHeroDetails(heroId: string): Observable<Hero | undefined> {
        return this.http
            .get<Hero[]>(`${this.apiUrl}${this.heroesPath}`)
            .pipe(map(heroes => {
                return Object.values(heroes).find(hero => hero.id === parseInt(heroId));
            })
            );
    }

    getHeroLore(heroName: string): Observable<string> {
        const heroNameCut = heroName.replace('npc_dota_hero_', '');
        const lores = `${this.apiUrl}${this.loresPath}`;
        return this.http.get<{ [key: string]: string }>(lores).pipe(
            map(lores => {
                return lores[heroNameCut];
            })
        );
    }

    getHeroAbilities(heroName: string): Observable<string[]> {
        const abilities = `${this.apiUrl}${this.heroAbilitiesPath}`;
        return this.http.get<{ [key: string]: string[] }>(abilities).pipe(
            map(lores => {
                return Object.values(lores[heroName]);
            })
        );
    }




    private getHeroImageCdnUrl(cdnProvider: 'cloudflare' | 'akamaihd', heroName: string): string {
        const cdnUrls = {
            cloudflare: `${this.cdnCloudflareUrl}/apps/dota2/images/dota_react/heroes/name.png`,
            akamaihd: `${this.cdnAkamaiUrl}/apps/dota2/images/heroes/name_full.png`
        };

        return `${cdnUrls[cdnProvider].replace('name', heroName)}`;
    }

    getItems(): Observable<any> {
        return this.http.get(`${this.apiUrl}${this.itemsPath}`);
    }

    getItemImage(imgUrl: string): string {
        return `${this.cdnCloudflareUrl}${imgUrl}`;
    }
}