import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { addDoc, collection, getDocs, query, where, Firestore } from '@angular/fire/firestore';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DotaService {
    private apiUrl = 'https://api.opendota.com/api';
    private cdnCloudflareUrl = 'https://cdn.cloudflare.steamstatic.com';
    private cdnAkamaiUrl = 'https://steamcdn-a.akamaihd.net';

    constructor(private http: HttpClient) { }

    getHeroes(): Observable<any> {
        return this.http.get(`${this.apiUrl}/heroes`);
    }

    getItems(): Observable<any> {
        return this.http.get(`${this.apiUrl}/constants/items`);
    }

    getHeroImage(heroName: string): string {
        const formattedName = heroName.replace('npc_dota_hero_', '');
        return this.getHeroImageCdnUrl("cloudflare", formattedName);
    }

    private getHeroImageCdnUrl(cdnProvider: 'cloudflare' | 'akamaihd', heroName: string): string {
        const cdnUrls = {
            cloudflare: `${this.cdnCloudflareUrl}/apps/dota2/images/dota_react/heroes/name.png`,
            akamaihd: `${this.cdnAkamaiUrl}/apps/dota2/images/heroes/name_full.png`
        };

        return `${cdnUrls[cdnProvider].replace('name', heroName)}`;
    }

    getItemImage(imgUrl: string): string {
        return `${this.cdnCloudflareUrl}${imgUrl}`;
    }



}