import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) { }

  getArticle(){
    // 'https://jsonplaceholder.typicode.com/users?email='+email
    return this.http.get('https://jsonplaceholder.typicode.com/posts?userId=1');
  }


}
