// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { TimelineComponent } from './timeline/timeline.component';
import { AuthGuard } from './services/auth.guard';
import { LoginCallbackComponent } from './login-callback/login-callback.component';

export const routes: Routes = [
  { path: 'login-callback', component: LoginCallbackComponent },
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    canActivate: [AuthGuard]
  },
  // ...other routes
];

