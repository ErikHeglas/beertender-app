import { Component, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  private _router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  currentRoute = signal(this.activatedRoute.snapshot.routeConfig?.path);

  goToBeerAdd(): void {
    this._router.navigate(['/beer-add']);
  }

  goBackToList(): void {
    this._router.navigate(['/beer-list']);
  }
}
