import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Title } from '@angular/platform-browser';
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor (private http: HttpClient) {}
  result: any;

  //actor section
  getActors() {
    return this.http.get("/actors");
  }

  getActor(id: string) {
    let url = "/actors/" + id;
    return this.http.get(url);
  }

  createActor(data) {
    return this.http.post("/actors", data, httpOptions);
  }

  updateActor(id, data) {
    let url = "/actors/" + id;
    return this.http.put(url, data, httpOptions);
  }

  deleteActor(id) {
    let url = "/actors/" + id;
    return this.http.delete(url, httpOptions);
  }


  //movie section
  createMovie(data){
    return this.http.post("/movies", data, httpOptions);
  }

  getMovie() {
    return this.http.get("/movies");
  }

  deleteMovie(id) {
    let url = "/movies/" + id;
    return this.http.delete(url, httpOptions);
  }



  deleteMoviesBeforeAYear(aYear){
    let url = "/moviesss/" +  aYear;
    return this.http.delete(url,httpOptions)
  }


  addActor(title, name){
    let url = "/movies/" + title+ "/"+ name;
    return this.http.put(url, httpOptions)
  }

}
