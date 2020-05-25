import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsServiceService } from 'src/app/service/news-service.service';
import { IonSegment } from '@ionic/angular';
import { Article } from 'src/app/pattern/pattern';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  @ViewChild(IonSegment, {static: true}) segment: IonSegment;
  news: Article[] = [];

  countries = [
     'ar','au','be','bg','br','cz','de','fr',
    'id','ng','pl',
  ];

  constructor(
    private newsSer: NewsServiceService,
  ) {}


  ngOnInit() 
  { 
    this.loadNews(this.countries[0]);
  }
  //loadnews
  loadNews(country: string, ev?)
  {
    this.newsSer.getTopCountry(country).subscribe(data => {
      this.news.push(...data.articles);
      if (ev) {
        ev.target.complete();
    }
    });
  }
  loadData(ev)
  {
    this.loadNews(this.segment.value, ev);
  }
  changeCountry(ev)
  {
    this.news = [];
    this.loadNews(ev.detail.value);
  }


}
