import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { BookService } from '../../services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { DataBook, Library } from '../../interfaces/books.interfaces';
import { AutoDestroyService } from '../../services/auto-destroy.service';
import { map, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'books-grid',
  standalone: true,
  imports: [HttpClientModule],
  providers: [BookService, AutoDestroyService],
  templateUrl: './books-grid.component.html',
  styleUrl: './books-grid.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooksGridComponent implements OnInit {
  protected readonly booksService: BookService = inject(BookService);
  protected readonly destroy$: AutoDestroyService = inject(AutoDestroyService);
  public $books: WritableSignal<DataBook[]> = signal([]);

  constructor() {}
  ngOnInit(): void {
    this.booksService
      .getProduct()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        // this.$books.set(data);
        this.$books.set(
          data.library.map((book) => {
            return { ...book.book };
          })
        );
      });
  }
}
