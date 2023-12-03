import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/core/interfaces/movie';
import { MoviesService } from '../../movies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie;

  @Output() addToWatchList: EventEmitter<Movie> = new EventEmitter<Movie>();

  alreadyStored: boolean;

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.moviesService.moviesStored$
      .subscribe(
        list => {
          if (list?.filter(movie => movie.id === this.movie.id).length > 0) {
            this.alreadyStored = true;
          } else {
            this.alreadyStored = false;
          }
        }
      );
  }

  onAddToWatchlist(event) {
    this.addToWatchList.emit(this.movie);
    event.stopPropagation();
  }

  onClick() {
    this.router.navigate([`movies/${this.movie.id}/detail`]);
  }
}
