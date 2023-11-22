import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from './article/article.component';
import { DetailArticleComponent } from './detail-article/detail-article.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ArticleComponent,
    DetailArticleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
