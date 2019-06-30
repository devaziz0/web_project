import {  Component, OnInit, Inject, Renderer, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  title = "My movies";
  games = [];

  constructor(private apiService : ApiService, private router: Router,) {
      this.fetch((data) => {
      this.games = data;
      console.log(this.games)
      });    
  }

  ngOnInit() {
      let navbar = document.getElementsByTagName('app-navbar')[0].children[0];
      navbar.classList.remove('navbar-transparent');
  }

  fetch(cb) {
      let games;
        this.apiService.getMovies()
                       .subscribe((value) =>{
                       games = value;
                       cb(games);
                     });
  }

  async delete(id) {
    await this.apiService.deleteMovie(parseInt(id))
                     .subscribe((value) =>{
                       console.log(value)
                     this.router.navigate(['/movies']);
                   });
  }

  deleteMovie(id) {    
    this.delete(parseInt(id))
  }
}
