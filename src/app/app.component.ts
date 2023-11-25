import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  role?: string;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  token?: string;

  eventBusSub?: Subscription;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.role = user.role;
      this.token = user.accessToken;
    }
  }

  logout(): void {
    this.storageService.clean();
    window.location.reload();
  }
}
