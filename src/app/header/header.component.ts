import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() sidenav: MatSidenav;
  constructor(private authService: AuthService) {}
  authSubscription: Subscription;
  isAuth: boolean = false;
  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });
  }

  onLogout() {
    this.authService.logout();
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
