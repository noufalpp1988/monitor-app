import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  articles: any;

  constructor(public apiServ:ApiService) { }

  ngOnInit() {
    this.apiServ.getNews().subscribe((data: any) => {
      console.log(data);
      this.articles = data['articles'];
    });
  }

}
