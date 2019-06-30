import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  CONFIG = {
    baseURL: '',
    token: null,
  }

  constructor(private http : HttpClient) {
    this.CONFIG.baseURL = 'http://localhost:4000';
  }

  getUsers (){
    const url = this.CONFIG.baseURL + '/user';
    
    return this.http.get(url);
  }

  getUsersCount (){
    const url = this.CONFIG.baseURL + '/user/count';
    
    return this.http.get(url);
  }

  createUser (body: any){
    const url = this.CONFIG.baseURL + '/user/';
    return this.http.post(url,body);
  }

  getOneUser (login : String){
    const url = this.CONFIG.baseURL + '/user/' + login;
    
    return this.http.get(url);
  }

  updateUser (login : String, body: any){
    const url = this.CONFIG.baseURL + '/user/' + login;
    
    return this.http.put(url,body);
  }

  deleteUser (login : String){
    const url = this.CONFIG.baseURL + '/user/' + login;
    
    return this.http.delete(url);
  }

  getMovies (){
    const url = this.CONFIG.baseURL + '/movie';
    
    return this.http.get(url);
  }

  getMoviesCount (){
    const url = this.CONFIG.baseURL + '/movie/count';
    
    return this.http.get(url);
  }

  getOneMovie (id : Number){
    const url = this.CONFIG.baseURL + '/movie/' + id;
    
    return this.http.get(url);
  }

  createMovie (body : any){
    const url = this.CONFIG.baseURL + '/movie/';
    
    return this.http.post(url, body);
  }

  updateMovie (id : Number,body : any){
    const url = this.CONFIG.baseURL + '/movie/' + id;
    
    return this.http.put(url, body);
  }

  deleteMovie (id : Number){
    const url = this.CONFIG.baseURL + '/movie/' + id;
    
    return this.http.delete(url);
  }

}
