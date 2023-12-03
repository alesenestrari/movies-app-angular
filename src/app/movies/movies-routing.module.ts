import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MoviesListComponent } from "./pages/movies-list/movies-list.component";
import { MovieDetailsComponent } from "./pages/movie-details/movie-details.component";

const routes: Routes = [
  {
    path: '',
    component: MoviesListComponent,
  },
  {
    path: ':id/detail',
    component: MovieDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
