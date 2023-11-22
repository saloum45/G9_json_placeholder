import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  getArticle(){
    return this.http.get('https://jsonplaceholder.typicode.com/posts')
  }


}
