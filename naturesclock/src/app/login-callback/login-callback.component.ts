// src/app/login-callback.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';

@Component({
  selector: 'app-login-callback',
  template: `<div>Loading...</div>`,
})
export class LoginCallbackComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.handleLoginCallback();
    this.router.navigate(['/timeline']);
  }
}
