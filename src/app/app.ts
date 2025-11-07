import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    `
})
export class AppComponent { }
