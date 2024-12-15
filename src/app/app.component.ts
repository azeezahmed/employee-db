import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'employee-database';
    pageHeader = ''

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute) {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.activeRoute),
                map(route => route.firstChild),
                switchMap(route => (route as ActivatedRoute)['data']),
                map(data => this.pageHeader = data['header'])).subscribe()

    }
}
