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
  search="";
  searchResult:any[]=[];


  constructor(private articleService:ArticleService){}
  ngOnInit(){
    this.articleService.getArticle().subscribe((reponse:any) => {
      this.articles=reponse;
      this.searchResult=reponse;
      console.log(this.articles)

    });
  }

  getSearch(){
    this.searchResult=[];
      this.articles.forEach((element:any) => {
        if (element.title.toLowerCase().includes(this.search.toLowerCase())) {
          this.searchResult.push(element);
        }
      });
  }

}
