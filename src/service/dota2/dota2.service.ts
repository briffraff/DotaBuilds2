import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { addDoc, collection, getDocs, query, where, Firestore } from '@angular/fire/firestore';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Abilities, Hero } from '../../components/heroes/hero-details/hero-details.model';

@Injectable({
    providedIn: 'root',
})
export class DotaService {
    apiUrl = 'https://api.opendota.com/api';
    cdnCloudflareUrl = 'https://cdn.cloudflare.steamstatic.com';
    cdnAkamaiUrl = 'https://steamcdn-a.akamaihd.net';
    cdnAkamaiUrlWeb = 'https://cdn.akamai.steamstatic.com';
    private heroesPath = '/constants/heroes';
    private loresPath = '/constants/hero_lore';
    private itemsPath = '/constants/items';
    private heroAbilitiesListPath = '/constants/hero_abilities';
    private heroAbilities = '/constants/abilities';

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

    getHeroAbilities(heroName: string): Observable<Abilities[]> {
        const abilitiesListPath = `${this.apiUrl}${this.heroAbilitiesListPath}`;
        const fullAbilitiesPath = `${this.apiUrl}${this.heroAbilities}`;

        return forkJoin({
            heroAbilities: this.http.get<{ [key: string]: any }>(abilitiesListPath),
            allAbilities: this.http.get<{ [key: string]: Abilities }>(fullAbilitiesPath)
        }).pipe(
            map(({ heroAbilities, allAbilities }) => {

                const heroAbilitiesNames = heroAbilities[heroName]?.abilities || [];

                return heroAbilitiesNames
                    .map((codeName: string) => {
                        const ability = allAbilities[codeName];
                        
                        if (ability) {
                            return {
                                codeName: codeName,
                                name: ability.dname,
                                behavior: ability.behavior,
                                description: ability.desc,
                                img: ability.img
                            } as unknown as Abilities;
                        }
                        return null;
                    })
                    // .filter((ability): ability is Abilities => ability !== null);
            })
        );
    }

    isAbility(data: any): data is Abilities {
        return data && typeof data.name === 'string' && typeof data.img === 'string';
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