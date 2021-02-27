import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor(public auth: AuthService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    console.log('Init public landing..');
    this.subscription = this.auth.user$.subscribe(
      (profile) => {
        localStorage.setItem('user', profile);
        if (profile) {
          console.log('Routing to /secure/dashboard ... ');
          this.router.navigate(['/secure/dashboard']);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
