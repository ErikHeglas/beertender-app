import { Component, inject, signal } from '@angular/core';
import { NavBarComponent } from '../shared/feature/nav-bar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  BeerApiService,
  BeerType,
  IBeerBase,
} from '../shared/data-access/beer-api.service';
import { LoadingComponent } from '../shared/ui/loading/loading.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beer-add',
  standalone: true,
  imports: [
    NavBarComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    LoadingComponent,
  ],
  templateUrl: './beer-add.component.html',
  styleUrl: './beer-add.component.scss',
})
export class BeerAddComponent {
  private _router = inject(Router);
  private _beerApiService = inject(BeerApiService);

  loading = signal(false);
  beerTypes = Object.values(BeerType);

  beerForm = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    description: new FormControl<string | null>(null, [Validators.required]),
    ibu: new FormControl<number | null>(null, [Validators.required]),
    type: new FormControl<BeerType | null>(null, [Validators.required]),
  });

  onSubmit() {
    if (this.beerForm.valid) {
      const newBeer: IBeerBase = {
        name: this.beerForm.value.name!,
        description: this.beerForm.value.description!,
        ibu: this.beerForm.value.ibu!,
        type: this.beerForm.value.type!,
      };
      this.loading.set(true);
      this._beerApiService.addBeerToList(newBeer).subscribe((data) => {
        this.loading.set(false);
        this._router.navigate(['/beer-list']);
      });
    }
  }
}
