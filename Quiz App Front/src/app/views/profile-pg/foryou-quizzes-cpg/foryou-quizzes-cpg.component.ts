import { Component, OnInit } from '@angular/core';
import { QuizProxyService } from 'src/app/services/proxy/quiz-proxy.service';

@Component({
  selector: 'app-foryou-quizzes-cpg',
  templateUrl: './foryou-quizzes-cpg.component.html',
  styleUrls: ['./foryou-quizzes-cpg.component.css'],
})
export class ForyouQuizzesCpgComponent implements OnInit {
  quizzes: any[] = [];
  constructor(private quizProxyS: QuizProxyService) {}

  ngOnInit(): void {
    this.getForYouQuizzes();
  }

  getForYouQuizzes() {
    this.quizProxyS.getQuizzesForYou().subscribe((response: any) => {
      this.quizzes = response;
    });
  }
}
