import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../sevices/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit{

  articles:any;
  userId:any;
  articlesByUser:any[]=[];
  userConnect:any;
  idUserConnect:any;

  constructor(private articleService:ArticleService, private route:ActivatedRoute){}
  
  ngOnInit(){
    this.idUserConnect=this.route.snapshot.params['id'];
    this.articleService.getArticle().subscribe((reponse:any) => {
      this.articles=reponse;
      this.getArticleByUser(reponse);
    })
      console.log('articles',this.articles) 
      this.userConnect=this.articles.find((element:any)=>element.userId==this.idUserConnect  );
  }


  getArticleByUser(test:any){
    this.articles.forEach((element:any) => {
      console.log('okay')
      if(element.userId==this.idUserConnect){
       this.articlesByUser.push(element)
      }
      
    });
  }

}
