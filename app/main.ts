import { bootstrap}  from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {provide} from '@angular/core';

import { AppComponent }         from './app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, {useValue : '/' })])
    .catch(console.error.bind(console));

