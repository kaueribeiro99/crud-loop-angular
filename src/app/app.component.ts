import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-loop';

  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  ngOnInit() {

  }

  onLogout() {
    this.authService.logout()
  }
}
