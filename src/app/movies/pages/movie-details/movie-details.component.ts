import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../movies.service';
import { Movie } from 'src/app/core/interfaces/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie;
  alreadyStored: boolean;

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.moviesService.onGetOne(id);

    this.moviesService.movie$.subscribe(
      movie => this.movie = movie
    );

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

  onRemove() {
    this.moviesService.removeFromWatchlist(this.movie.id);
  }
}
