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
  imageUrlFixed="https://img.freepik.com/premium-photo/luxury-interior-room-design-uhd-wallpaper_871881-52626.jpg?size=626&ext=jpg&ga=GA1.1.522834921.1700648147&semt=sph";
  articles: any;
  userId: any;
  articlesByUser: any[] = [];
  userConnect: any;
  idUserConnect: any;
  search = "";
  searchResult: any[] = [];
  details={title:'',body:'',image:''};

  userArticle:any[]=[]
  userArticleRecup:any;

  constructor(private articleService: ArticleService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.idUserConnect = this.route.snapshot.params['id'];
    this.articleService.getArticle().subscribe((reponse: any) => {
      this.articles = reponse;
      this.getArticleByUser();

      // this.searchResult=reponse;
      console.log(this.articles)
    })

    // if (!localStorage.getItem('articles')) {
    //   localStorage.setItem('articles', JSON.stringify(this.userArticle));

    // }
    this.userArticleRecup=JSON.parse(localStorage.getItem('articles')|| '[]');
    console.log(this.userArticleRecup)
    this.userArticleRecup=this.articlesByUser;

    // console.log('articles', this.articles)
    // this.userConnect = this.articles.find((element: any) => element.userId == this.idUserConnect);
  }


  getArticleByUser() {
    this.articles.forEach((element: any) => {
      // console.log('okay')
      if (element.userId == this.idUserConnect) {
        this.articlesByUser.push(element)
      }

    });
    if (localStorage.getItem('articles')==null ||  localStorage.getItem('articles')==undefined) {
      localStorage.setItem('articles',JSON.stringify(this.articlesByUser));
    }
    this.searchResult=JSON.parse(localStorage.getItem('articles')||'[]');
    // this.searchResult = this.articlesByUser;
    // if (localStorage.getItem('articles')==null || localStorage.getItem('articles')==undefined) {

    // }else{
    //   this.searchResult =JSON.parse(localStorage.getItem('articles')||'[]');
    // }


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

  showDetails(article:any){
    this.details=article;
    console.warn(this.details.title)
  }
  addArticle(){
    let articlesTmp=JSON.parse(localStorage.getItem('articles')||'[]');
    let article={
      userId:this.idUserConnect,
      id:this.userArticleRecup.length +1,
      title:this.titre,
      body:this.texte,
      image:this.photo,
    }
    articlesTmp.push(article);
    localStorage.setItem('articles',JSON.stringify(articlesTmp));
    this.getArticleByUser();
    // this.userArticleRecup.push(article);
    // localStorage.setItem('articles', JSON.stringify(this.userArticleRecup));
    console.log(this.userArticleRecup);
  }
}
