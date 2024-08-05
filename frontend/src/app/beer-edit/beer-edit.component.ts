import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, map, Observable, switchMap, take, tap } from 'rxjs';
import {
  BeerApiService,
  BeerType,
  IBeer,
} from '../shared/data-access/beer-api.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../shared/ui/loading/loading.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { NavBarComponent } from '../shared/feature/nav-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from '../shared/ui/not-found/not-found.component';

@Component({
  selector: 'app-beer-edit',
  standalone: true,
  imports: [
    CommonModule,
    NavBarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LoadingComponent,
    NotFoundComponent,
  ],
  templateUrl: './beer-edit.component.html',
  styleUrl: './beer-edit.component.scss',
})
export class BeerEditComponent {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _beerApiService = inject(BeerApiService);

  beerForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
    ibu: new FormControl<number | null>(null, [Validators.required]),
    type: new FormControl<BeerType | null>(null, [Validators.required]),
  });

  loading = signal(true);
  beerTypes = Object.values(BeerType);

  private _id$ = this._route.paramMap.pipe(map((params) => params.get('id')));

  beer$: Observable<IBeer> = this._id$.pipe(
    take(1),
    switchMap((id) => {
      this.loading.set(true);
      return this._beerApiService.getBeer(Number(id));
    }),
    tap((beer) => {
      this.beerForm.patchValue({
        name: beer.name,
        description: beer.description,
        ibu: beer.ibu,
        type: beer.type,
      });
    }),
    finalize(() => {
      this.loading.set(false);
    })
  );

  onSubmit() {
    if (this.beerForm.valid) {
      this._id$.pipe(take(1)).subscribe((id) => {
        if (id) {
          const newBeer: IBeer = {
            id: Number(id),
            name: this.beerForm.value.name!,
            description: this.beerForm.value.description!,
            ibu: this.beerForm.value.ibu!,
            type: this.beerForm.value.type!,
          };

          this.loading.set(true);
          this._beerApiService
            .editBeer(Number(id), newBeer)
            .pipe(take(1))
            .subscribe((data) => {
              this.loading.set(false);
              this._router.navigate(['/beer-list']);
            });
        }
      });
    }
  }
}
