import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { QuizProxyService } from 'src/app/services/proxy/quiz-proxy.service';

@Component({
  selector: 'app-my-quizzes-cpg',
  templateUrl: './my-quizzes-cpg.component.html',
  styleUrls: ['./my-quizzes-cpg.component.css'],
})
export class MyQuizzesCpgComponent implements OnInit {
  quizzes: any[] = [];
  userId!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private quizProxyS: QuizProxyService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.userId = params.profileId;
      this.getMyQuizzes(params.profileId);
    });
  }

  getMyQuizzes(userId: string) {
    this.quizProxyS.getQuizzesMy(userId).subscribe((response: any) => {
      this.quizzes = response;
    });
  }

  onQuizDeleteBtnClick(quizId: string) {
    this.quizProxyS.deleteQuiz(quizId).subscribe((response) => {
      this.getMyQuizzes(this.userId);
    });
  }
}
