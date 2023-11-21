import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
  }

  getUsers(success:Function){

    this.http.get('http://jsonplaceholder.typicode.com/users').subscribe(
      reponse=> success(reponse)
    )
  }

}
