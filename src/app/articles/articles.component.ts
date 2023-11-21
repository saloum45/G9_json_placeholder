import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  users: any;
  constructor(private api: ApiService) {

  }
  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.api.getUsers((reponse: any) => {
      this.users = reponse;
      console.warn(this.users);
    });
  }
}
