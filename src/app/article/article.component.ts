import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../sevices/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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

  userArticle:any[]=[];
  userArticleRecup:any;
  pageActuelle: number=1;
  articlesParPage: number=4;
  // recupArticle: any=JSON.parse(localStorage.getItem('articles')||'[]').reverse();

  textButton='Archiver';

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
    //    localStorage.setItem('articles', JSON.stringify(this.userArticle));

    //   }
    // this.userArticleRecup=JSON.parse(localStorage.getItem('articles')|| '[]');
    // console.log(this.userArticleRecup)
    

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
   
    this.searchResult=JSON.parse(localStorage.getItem('articles')||'[]');



    
  }

  getSearch() {
    this.searchResult = [];
    let searchTmp=[];
    searchTmp=JSON.parse(localStorage.getItem('articles')||'[]');
    searchTmp.forEach((element: any) => {
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
    // console.log(this.userArticleRecup);
    this.sweetMessage('success','Félicitation','Article ajouté avec succès');
  }

  sweetMessage(icon:any,title:any,text:any) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    });
  }
  currentArticle:any;
  charger(paramArticle:any){
    this.currentArticle=paramArticle;
    this.titre=paramArticle.title;
    this.photo=paramArticle.image;
    this.texte=paramArticle.body;
  
  }
  modifierArticle(){
    let articleModif=JSON.parse(localStorage.getItem('articles')||'[]');
    this.currentArticle.title=this.titre;
    this.currentArticle.body=this.texte;
    this.currentArticle.image=this.photo;
    localStorage.setItem('articles', JSON.stringify(articleModif)) 
    this.sweetMessage('success', 'Félicitation', 'Article modifié avec succès');
    console.log(articleModif )
  }


  toggleEtat(prof: any) {
    prof.etat = (prof.etat === 'active') ? 'inactive' : 'active';
  
    // Vous pouvez ajouter ici la logique pour mettre à jour l'état du professeur dans votre base de données ou tout autre traitement nécessaire
  }
  

  

 
   

  // Méthode pour déterminer les articles à afficher sur la page actuelle
  getArticlesPage(): any[] {
    const indexDebut = (this.pageActuelle - 1) * this.articlesParPage;
    const indexFin = indexDebut + this.articlesParPage;
    return this.searchResult.reverse().slice(indexDebut, indexFin);
  }
   // Méthode pour générer la liste des pages
   get pages(): number[] {
    const totalPages = Math.ceil(this.searchResult.length / this.articlesParPage);
    return Array(totalPages).fill(0).map((_, index) => index + 1);
  }

  // Méthode pour obtenir le nombre total de pages
  get totalPages(): number {
    return Math.ceil(this.searchResult.length / this.articlesParPage);
  }
}
