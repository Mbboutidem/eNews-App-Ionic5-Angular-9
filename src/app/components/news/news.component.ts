import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/pattern/pattern';


@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
    @Input() news: Article[] = [];
    @Input() onFavorites = false; //

    constructor() {}

    ngOnInit() {}
}
