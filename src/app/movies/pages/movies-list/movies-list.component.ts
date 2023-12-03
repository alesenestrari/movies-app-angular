import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { Subject, takeUntil } from 'rxjs';
import { Movie } from 'src/app/core/interfaces/movie';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject<boolean>;

  movies: Movie[];
  selectedSortOption: string = 'title';


  constructor(private moviesService: MoviesService) {}


  ngOnInit(): void {
    this.moviesService.onGetAll();
    this.moviesService.moviesList$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(list => {
        this.movies= list;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onAddToWatchlist(movie: Movie) {
    this.moviesService.addToWatchlist(movie);
  }

  onSortChange(option) {
    this.selectedSortOption = option.value;
    this.sortList();
  }

  sortList() {
    if (this.selectedSortOption === 'title') {
      this.movies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.selectedSortOption === 'released_date') {
      this.movies.sort((a, b) => new Date(a.released_date).getTime() - new Date(b.released_date).getTime());
    }
  }
}
