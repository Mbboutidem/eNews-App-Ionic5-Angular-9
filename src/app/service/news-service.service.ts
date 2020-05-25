import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { Article, ResponseTopHeadlines } from '../pattern/pattern';


const apiKey = '65a5ac7c5ffc4e2ea02f02cf2898ec8a';
const apiUrl = 'https://newsapi.org/v2';

const params = new HttpParams().set('apiKey', apiKey);
//const headers = new HttpHeaders().set('apiUrl', apiUrl)

@Injectable({
  providedIn: 'root'
})

export class NewsServiceService
 {
  headLinesPage = 0;
  categoryAct = '';
  categoryPg = 0;
  //articles$: Article[] = [];


  constructor(
    private http: HttpClient,
  ) { }
  // private startQuery(query: string)
  // {
  //   query = apiUrl + query;
  //   return this.http.get(query, {params});
  // }

  //gettop headlines
  getTopHeadlines()
  {
    this.headLinesPage++;
    return this.http.get<ResponseTopHeadlines>(`${apiUrl}/top-headlines?country=us&page=${this.headLinesPage}`, {params})
  }

  getTopCategory(category: string)
  {
    if (this.categoryAct === category) {
      this.categoryPg++;
  } else {
      this.categoryPg = 1;
      this.categoryAct = category;
  }
    return this.http.get<ResponseTopHeadlines>(`${apiUrl}/top-headlines?country=us&category=${category}&page=${this.categoryPg}`, {params});
  }

  getTopCountry(country: string)
  {
    return this.http.get<ResponseTopHeadlines>(`${apiUrl}/top-headlines?country=${country}`, {params})

  }


}