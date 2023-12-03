import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './pages/movies-list/movies-list.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SafeYoutubeUrlPipe } from '../core/pipes/safe-youtube-url.pipe';



@NgModule({
  declarations: [
    MoviesListComponent,
    MovieComponent,
    MovieDetailsComponent,
    SafeYoutubeUrlPipe
  ],
  imports: [
    MoviesRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class MoviesModule { }
