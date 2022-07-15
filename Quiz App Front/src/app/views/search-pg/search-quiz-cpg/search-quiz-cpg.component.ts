import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizProxyService } from 'src/app/services/proxy/quiz-proxy.service';

@Component({
  selector: 'app-search-quiz-cpg',
  templateUrl: './search-quiz-cpg.component.html',
  styleUrls: ['./search-quiz-cpg.component.css'],
})
export class SearchQuizCpgComponent implements OnInit {
  searchBody: string = '';
  quizzes: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizProxyS: QuizProxyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((qParams: any) => {
      this.searchQuizzes(qParams.searchBody);
    });
  }

  searchQuizzes(searchBody: string) {
    this.quizProxyS
      .getQuizzesBySearch(searchBody)
      .subscribe((response: any) => {
        this.quizzes = response;
      });
  }
}
