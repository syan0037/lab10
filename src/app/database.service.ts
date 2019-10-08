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
    let url = "/movies/" +  aYear;
    return this.http.delete(url,httpOptions)
  }


  addActor(data){
    // console.log(data);
    
    // let url = "/movies/" + data; 
    //"movies/"+ data[]
    let url = "/movies/" + data.id + "/"+ data.actorId;
    return this.http.post(url, data, httpOptions)
  }

  // addActor(fullName, title, data){
  //   let url = "/actors/" + fullName + '/' + title;
  //   return this.http.put(url, data, httpOptions)
  // }

}
