import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../sevices/article.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  // ajout article variable
  photo:string='';
  titre:string='';
  texte:string='';

  articles: any;
  userId: any;
  articlesByUser: any[] = [];
  userConnect: any;
  idUserConnect: any;
  search = "";
  searchResult: any[] = [];

  userArticle:any[]=[]
  userArticleRecup:any;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.idUserConnect = this.route.snapshot.params['id'];
    this.articleService.getArticle().subscribe((reponse: any) => {
      this.articles = reponse;
      this.getArticleByUser(reponse);
      // this.searchResult=reponse;
      console.log(this.articles)
    })

    if (!localStorage.getItem('articles')) {
      localStorage.setItem('articles', JSON.stringify(this.userArticle));
      
    }
    this.userArticleRecup=JSON.parse(localStorage.getItem('articles')|| '[]');
    console.log(this.userArticleRecup)
    this.userArticleRecup.push(this.articlesByUser)
    
    // console.log('articles', this.articles)
    // this.userConnect = this.articles.find((element: any) => element.userId == this.idUserConnect);
  }


  getArticleByUser(test: any) {
    this.articles.forEach((element: any) => {
      // console.log('okay')
      if (element.userId == this.idUserConnect) {
        this.articlesByUser.push(element)
      }
      this.searchResult = this.articlesByUser;

    });


    // });
  }

  getSearch() {
    this.searchResult = [];
    this.articlesByUser.forEach((element: any) => {
      if (element.title.toLowerCase().includes(this.search.toLowerCase())) {
        this.searchResult.push(element);
      }
    });
  }

  deconnexion() {
    this.router.navigate(['login']);
    localStorage.removeItem('userOnline');

  }

  addArticle(){
    let article={
      userId:this.idUserConnect,
      id:this.userArticleRecup.length +1,
      title:this.titre,
      body:this.texte
      
    }
    this.userArticleRecup[0].push(article)
    localStorage.setItem('articles', JSON.stringify(this.userArticle))
    console.log(this.userArticleRecup)
  }
}
