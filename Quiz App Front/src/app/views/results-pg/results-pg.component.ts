import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizProxyService } from 'src/app/services/proxy/quiz-proxy.service';

@Component({
  selector: 'app-results-pg',
  templateUrl: './results-pg.component.html',
  styleUrls: ['./results-pg.component.css'],
})
export class ResultsPgComponent implements OnInit {
  results: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizProxyS: QuizProxyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getResults(params.quizId);
    });
  }

  getResults(id: string) {
    this.quizProxyS.getResults(id).subscribe((response: any) => {
      this.results = response;
    });
  }
}
