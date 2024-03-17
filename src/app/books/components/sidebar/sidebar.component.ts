import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { BookService } from '../../services/book.service';
import { AutoDestroyService } from '../../services/auto-destroy.service';
import { takeUntil } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { Library } from '../../interfaces/books.interfaces';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [HttpClientModule],
  providers: [BookService, AutoDestroyService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  protected readonly booksService: BookService = inject(BookService);
  protected readonly destroy$: AutoDestroyService = inject(AutoDestroyService);

  public $genres: WritableSignal<string[]> = signal([]);
  public $authors: WritableSignal<string[]> = signal([]);

  ngOnInit(): void {
    this.booksService
      .getProduct()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.setData(data);
      });
  }

  setData(data: Library): void {
    const genres = new Set<string>();
    const authors = new Set<string>();

    data.library.map(({ book }) => {
      genres.add(book.genre);
      authors.add(book.author.name);
    });

    this.$genres.set(Array.from(genres));
    this.$authors.set(Array.from(authors));
  }
}
