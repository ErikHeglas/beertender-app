import { Component, input, Input, output, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IBeer } from '../../../shared/data-access/beer-api.service';

@Component({
  selector: 'app-beer-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './beer-card.component.html',
  styleUrl: './beer-card.component.scss',
})
export class BeerCardComponent {
  /* @Input({required: true}) beer!: IBeer; */
  beer = input.required<IBeer>();
  edit = output<number>();
  delete = output<number>();

  onEdit(): void {
    this.edit.emit(this.beer().id);
  }

  onDelete(): void {
    this.delete.emit(this.beer().id);
  }
}
