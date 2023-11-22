import { aricleGuard } from './aricle.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ArticleComponent } from './article/article.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'article/:id',component:ArticleComponent,canActivate:[aricleGuard]
  },
  {
    path:'login',component:LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
