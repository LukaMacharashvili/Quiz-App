import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizProxyService } from 'src/app/services/proxy/quiz-proxy.service';

@Component({
  selector: 'app-take-test-pg',
  templateUrl: './take-test-pg.component.html',
  styleUrls: ['./take-test-pg.component.css'],
})
export class TakeTestPgComponent implements OnInit {
  quiz: any = {};
  questionIndex: number = 0;
  pointsEarned: number = 0;
  quizFinished: boolean = false;
  constructor(
    private quizProxyS: QuizProxyService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getQuiz(params.quizId);
    });
  }

  getQuiz(id: string) {
    this.quizProxyS.getQuizById(id).subscribe((response) => {
      this.quiz = response;
    });
  }

  onAnswerBtnClick(correct: boolean, questionIndex: number) {
    if (correct) {
      this.pointsEarned += this.quiz.quizQuestiions[questionIndex].point;
    }
    this.quiz.quizQuestiions.splice(questionIndex, 1);
    if (this.quiz.quizQuestiions.length === 0) {
      this.quizFinished = true;
      this.onQuizSubmit();
    }
  }

  onQuizSubmit() {
    this.quizFinished = true;
    this.quizProxyS
      .uploadResults(this.quiz._id, this.pointsEarned)
      .subscribe((response) => {});
  }
}
