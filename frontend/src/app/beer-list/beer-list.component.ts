import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NavBarComponent } from '../shared/feature/nav-bar.component';
import { BeerCardComponent } from './ui/beer-card/beer-card.component';
import { BeerApiService, IBeer } from '../shared/data-access/beer-api.service';
import {
  catchError,
  finalize,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../shared/ui/loading/loading.component';
import { Router } from '@angular/router';
import { NotFoundComponent } from '../shared/ui/not-found/not-found.component';

@Component({
  selector: 'app-beer-list',
  standalone: true,
  imports: [
    NavBarComponent,
    BeerCardComponent,
    CommonModule,
    LoadingComponent,
    NotFoundComponent,
  ],
  templateUrl: './beer-list.component.html',
  styleUrl: './beer-list.component.scss',
})
export class BeerListComponent implements OnDestroy {
  private _router = inject(Router);
  private _beerApiService = inject(BeerApiService);

  loading = signal(true);

  private _refresh$ = new Subject<void>();
  private _destroyed$ = new Subject<void>();

  beerList$: Observable<IBeer[]> = this._refresh$.pipe(
    startWith(null),
    switchMap(() => {
      this.loading.set(true);
      return this._beerApiService.getBeerList().pipe(
        catchError((err) => {
          console.error('Error fetching beer list', err);
          return of([]);
        }),
        takeUntil(this._destroyed$),
        finalize(() => {
          this.loading.set(false);
        })
      );
    })
  );

  editBeer(id: number): void {
    this._router.navigate(['beer-edit', id]);
  }

  deleteBeer(id: number): void {
    this._beerApiService.deleteBeer(id).subscribe((data) => {
      this._refresh$.next();
    });
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
