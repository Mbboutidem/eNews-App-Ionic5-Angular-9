import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsServiceService } from 'src/app/service/news-service.service';
import { Article } from 'src/app/pattern/pattern';
import { IonSegment } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  //
  @ViewChild(IonSegment, { static: true }) segment: IonSegment;

  public categories: string[] = [
      'business',
      'entertainment',
      'general',
      'health',
      'science',
      'sports',
      'technology',
  ];
  news: Article[] = [];

  constructor(
    private newsSer: NewsServiceService,
  ) {}
  ngOnInit()
  {
    this.loadNews(this.categories[0])

  }
  //
  
  changeCategory(ev) {
    this.news = [];
    this.loadNews(ev.detail.value);
}
//get news details
loadNews(category: string, ev?) {
    this.newsSer.getTopCategory(category).subscribe(data =>
      {
        this.news.push(...data.articles);
        if(ev)
        {
          ev.target.complete();
        }

      });
}

loadData(ev) 
{
    this.loadNews(this.segment.value, ev);
}
}