import { Injectable } from "@angular/core";
import { MovieService } from "../core/services/movie.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Movie } from "../core/interfaces/movie";

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  moviesListStored = 'MOVIES';


  private moviesListSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>(null);
  private moviesStoredSubject: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>(JSON.parse(localStorage.getItem(this.moviesListStored)));
  private movieSubject: BehaviorSubject<Movie> = new BehaviorSubject<Movie>(null);

  constructor(private movieService: MovieService) {
  }

  get moviesList$(): Observable<Movie[]> {
    return this.moviesListSubject.asObservable();
  }

  get moviesStored$(): Observable<Movie[]> {
    return this.moviesStoredSubject.asObservable();
  }

  get movie$(): Observable<Movie> {
    return this.movieSubject.asObservable();
  }

  onGetAll() {
    this.movieService.getAll().subscribe(
      {
        next: list => {
          this.moviesListSubject.next(list);
        },
        error: err => {
          console.error(err);
        }
      }
    );
  }

  onGetOne(id: string) {
    this.movieService.getOne(id).subscribe({
      next: movie => {
        this.movieSubject.next(movie);
      },
      error: err => {
        console.error(err);
      }
    });
  }

  addToWatchlist(movie: Movie) {
    const previousData = JSON.parse(localStorage.getItem(this.moviesListStored)) || [];
    const newData = JSON.stringify([...previousData, movie]);

    localStorage.setItem(this.moviesListStored, newData);
    this.moviesStoredSubject.next(JSON.parse(newData));
  }

  removeFromWatchlist(id: string) {
    const previousData = JSON.parse(localStorage.getItem(this.moviesListStored)) || [];
    const filter = JSON.stringify(previousData.filter(movie => movie.id !== id));

    localStorage.setItem(this.moviesListStored, filter);
    this.moviesStoredSubject.next(JSON.parse(filter));
  }

}
