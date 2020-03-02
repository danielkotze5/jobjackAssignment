import { Component, ɵConsole } from '@angular/core';
import {HttpClientModule, HttpClient, HttpParams} from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';

//import 'rxjs/add/operator/map';
import {map} from 'rxjs/operators';
import{myFolder} from './fileInfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //readonly ROOT_URL = 'https://jsonplaceholder.typicode.com'
  //readonly ROOT_URL = 'http://localhost:5000/asb/views'
  //readonly ROOT_URL = 'http://localhost:5000/asb/'
  readonly ROOT_URL = 'http://localhost:5000/'   //werk vir angularClientApp
  readonly POST_URL = '/views'
  readonly publicForClient = 'http://localhost:5000/publicForClient'
  readonly views = 'http://localhost:5000/views'
  readonly dott = '.';
  //readonly ROOT_URL = 'http://localhost:5000/'

title = 'angularClientApp';
myFolder:any;
posts: any;
posts2: any;

constructor(private http: HttpClient){}

getPosts(): Observable<myFolder[]>{  
  //this.posts = this.http.get(this.ROOT_URL + '/posts') 
  this.posts = this.http.get(this.ROOT_URL)  // correct original
  //this.posts = this.http.get<myFolder[]>(this.ROOT_URL); 
  //this.posts.name = "hello";
  return this.posts;  
  //this.myFolder = (this.posts).map(posts => posts.folder);
}

/*
postRequest(){
    this.posts2 = this.http.post(this.ROOT_URL,this.dott)
    //console.log("&&&&&&&&&&&" + this.posts2);
    return this.posts2;
}
*/
}
