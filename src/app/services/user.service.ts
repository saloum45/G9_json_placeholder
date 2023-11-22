import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  constructor(private http:HttpClient) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  getUser(email:any,anwser:Function){
    this.http.get('https://jsonplaceholder.typicode.com/users?email='+email).subscribe(
      (reponse:any)=>{
        anwser(reponse);
      }
    )
  }
}
