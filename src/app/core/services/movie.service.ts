import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { MOVIES_MOCK } from "../data/movies.mock";
import { Movie } from "../interfaces/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor() {
  }

  getAll(): Observable<Movie[]> {
    return of(MOVIES_MOCK);
  }

  getOne(id: string): Observable<Movie> {
    return of(MOVIES_MOCK.find(m => m.id === id));
  }

}
