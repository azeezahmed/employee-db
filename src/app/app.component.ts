import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Data, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { AppService } from './services/app-data.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'employee-database';
    pageHeader = ''



    constructor(private _adapter: DateAdapter<any>,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private appService: AppService) {
        // this._adapter.getDayOfWeekNames = () => { localeData.weekdays }
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.activeRoute),
                map(route => route.firstChild),
                switchMap(route => (route as ActivatedRoute)['data']),
                map(data => this.pageHeader = data['header'])).subscribe()

    }
}
