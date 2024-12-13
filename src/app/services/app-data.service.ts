import { Injectable, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    pageHeader = signal('')
    constructor(private router: Router, private activeRoute: ActivatedRoute) {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.activeRoute),
                map(route => route.firstChild),
                switchMap(route => (route as ActivatedRoute)['data']),
                map(data => console.log(data)))
    }

}