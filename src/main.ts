import 'zone.js/dist/zone';
import { Component, importProvidersFrom } from '@angular/core';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  Route,
  Router,
  RouteReuseStrategy,
  RouterModule,
  withDebugTracing,
} from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

@Component({
  selector: 'home',
  standalone: true,
  template: 'HOME',
})
export class HomeComponent {}

@Component({
  selector: 'modal',
  standalone: true,
  template: 'Hello from modal',
})
export class ModalComponent {}

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <router-outlet></router-outlet>
    <h1>Hello from {{name}}!</h1>
    <a [routerLink]="['/home']">home</a><br/><br/>
    <a [routerLink]="[{ outlets: { 'modal': 'settings' } }]">go to modal</a><br/><br/><br/>
    <router-outlet name="modal"></router-outlet><br/><br/><br/>
    <a [routerLink]="[{ outlets: { 'modal': null } }]">get out from modal</a><br/><br/>
    <a (click)="leave()">leave</a>
  `,
})
export class App {
  name = 'Angular';

  constructor(private router: Router) {}

  leave() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}

const routes: Route[] = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'settings',
    outlet: 'modal',
    component: ModalComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'home',
  },
];

bootstrapApplication(App, {
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideRouter(routes, withDebugTracing()),
    importProvidersFrom(IonicModule.forRoot({})),
  ],
});
