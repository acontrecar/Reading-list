import { Component, WritableSignal, inject, signal } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AutoDestroyService } from '../../services/auto-destroy.service';
import { DataBook } from '../../interfaces/books.interfaces';
import { takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [HttpClientModule, FormsModule],
  providers: [BookService, AutoDestroyService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  protected readonly booksService: BookService = inject(BookService);
  protected readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  public max: number = 0;
  public min: number = 0;
  public selectedValue: number = 0;
  public numbers: number[] = [];
  public years: number[] = [];
  public $years: WritableSignal<number[]> = signal([]);

  constructor() {}
  ngOnInit(): void {
    this.booksService
      .getProduct()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        data.library.map((book) => {
          this.numbers.push(Number(book.book.pages));
          this.years.push(book.book.year);
        });

        this.$years.set(this.years.sort());

        this.max = Math.max(...this.numbers);
        this.min = Math.min(...this.numbers);
        this.selectedValue = this.min;
      });
  }
}
