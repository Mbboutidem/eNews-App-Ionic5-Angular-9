import { Component, OnInit } from '@angular/core';
import { NewsServiceService } from 'src/app/service/news-service.service';
import { Article } from 'src/app/pattern/pattern';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  news: Article[] = [];
  data: any;
  //articles: Article[] = [];

  constructor(
    private newsSer: NewsServiceService,
  ) 
  {}
  ngOnInit() {
    this.loadNews();
}
  //refresher - to refrsh the news page
  public  onRefresh(event)
  {
      this.newsSer.getTopHeadlines(); 
      this.doRefrsh(event)
  }
  doRefrsh(event)
  {
      setTimeout(() => {
          event.target.complete();
      }, 2000);
  }

  loadData(ev) {
      this.loadNews();
  }


  //load news
  loadNews(ev?) {
    this.newsSer.getTopHeadlines().subscribe(data =>
      {
      if(data.articles.length === 0)
      {
        ev.target.disabled = true; return;
      }else
      {
        this.news.push(...data.articles);
      } if(ev)
      {
        ev.target.complete();
      }
      })
    
    // .then
    // (data => { 
    //   console.log('article',data.status);
    //   console.log(data.data);
    //   console.log(data.headers);
    //   this.data = data;
    // })
    // .catch(error => {
    //   console.log(error.params);
    //   console.log(error.error);
    //   console.log(error.headers);
    // {
    //   console.log('article', data)
    //   this.data = data;
    // })

    // .subscribe(response =>
    //   {
    //     console.log(response)
  
  }

}
