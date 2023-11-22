import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../sevices/article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{

  articles:any;
  userId:any;


  constructor(private articleService:ArticleService){}
  ngOnInit(){
    this.articleService.getArticle().subscribe((reponse:any) => {
      this.articles=reponse;
      console.log(this.articles)
      
    })
  }

}
