import { Component } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-loop';
  public showToolbar: any = false;


  constructor(
      private router: Router
  ) { }

  ngOnInit() {
    // this.showToolbar = sessionStorage.getItem('firebase') ?? false
  }

  // Esse método remove todos os dados salvos no sessionStorage
  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
