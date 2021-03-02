import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService,  @Inject(DOCUMENT) private doc: Document) { }

  ngOnInit(): void {
    // TODO .. route away if not logged on
  }

  logout(): void {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }

}
