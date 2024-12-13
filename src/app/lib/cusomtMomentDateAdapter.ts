import { MatMomentDateAdapterOptions, MomentDateAdapter } from "@angular/material-moment-adapter";

export class CustomMomentDateAdapter extends MomentDateAdapter {
    constructor(dateLocale: string, options?: MatMomentDateAdapterOptions | undefined) {
        super(dateLocale, options);
    }
    override getDayOfWeekNames(style: 'long' | 'short' | 'narrow') {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    }
}