import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { QuizProxyService } from 'src/app/services/proxy/quiz-proxy.service';

@Component({
  selector: 'app-add-new-quiz-pg',
  templateUrl: './add-new-quiz-pg.component.html',
  styleUrls: ['./add-new-quiz-pg.component.css'],
})
export class AddNewQuizPgComponent implements OnInit {
  quizForm!: FormGroup;
  coverPic!: any;
  expirationDate!: number;
  questionImages: any[] = [];
  submitBtnCancel: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private quizProxyS: QuizProxyService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.quizForm = this.formBuilder.group({
      title: new FormControl<string | null>(null, Validators.required),
      coverPicture: '',
      expirationDate: new FormControl<number | null>(null, Validators.required),
      status: new FormControl<string | null>(null, Validators.required),
      quizQuestiions: this.formBuilder.array([], Validators.required),
      forWho: this.formBuilder.array([]),
    });
  }

  onDateChange(event: any) {
    const date = new Date(event.target.value);
    const dateIntoMilliseconds = date.getTime();
    this.expirationDate = dateIntoMilliseconds;
    this.quizForm.value.expirationDate = this.expirationDate;
  }

  onQuizCoverPicUpload(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.coverPic = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onQuestionImageUpload(
    event: any,
    questionImgInp: any,
    questionIndex: number
  ) {
    const reader = new FileReader();
    reader.onload = () => {
      questionImgInp.value = reader.result;
      this.questionImages.push({ image: reader.result, idx: questionIndex });
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  getAllQuestions(): FormArray {
    return this.quizForm.get('quizQuestiions') as FormArray;
  }

  createNewQuestion(): FormGroup {
    return this.formBuilder.group({
      question: new FormControl<string | null>(null, Validators.required),
      point: new FormControl<number | null>(null, Validators.required),
      answers: this.formBuilder.array([], Validators.required),
      image: '',
    });
  }

  getQuestionsAllAnswers(questionIndex: number): FormArray {
    return this.getAllQuestions().at(questionIndex).get('answers') as FormArray;
  }

  createNewAnswer(): FormGroup {
    return this.formBuilder.group({
      txt: new FormControl<string | null>(null, Validators.required),
      correct: false,
    });
  }

  getAllForWho(): FormArray {
    return this.quizForm.get('forWho') as FormArray;
  }

  createNewForWho(): FormGroup {
    return this.formBuilder.group({
      email: '',
    });
  }

  ngOnInit(): void {}

  addNewQuestion() {
    this.getAllQuestions().push(this.createNewQuestion());
  }

  deleteQuestion(questionIndex: number) {
    this.getAllQuestions().removeAt(questionIndex);
  }

  addNewAnswer(questionIndex: number) {
    this.getQuestionsAllAnswers(questionIndex).push(this.createNewAnswer());
  }

  deleteAnswer(questionIndex: number, answerIndex: number) {
    this.getQuestionsAllAnswers(questionIndex).removeAt(answerIndex);
  }

  addNewForWho() {
    this.getAllForWho().push(this.createNewForWho());
  }

  deleteForWho(forWhoIndex: number) {
    this.getAllForWho().removeAt(forWhoIndex);
  }

  onFormSubmit() {
    this.submitBtnCancel = true;
    this.quizForm.value.coverPicture = this.coverPic;
    this.quizForm.value.expirationDate = this.expirationDate;
    this.questionImages.forEach((image: any) => {
      this.getAllQuestions().at(image.idx).value.image = image.image;
    });
    this.quizProxyS.addQuiz(this.quizForm.value).subscribe(
      (response) => {
        if (response) {
          this.snackBar.open('Uploaded Successfully', 'OK!');
          this.router.navigate(['myprofile/foryou']);
        }
      },
      (error: any) => {
        this.submitBtnCancel = false;
        this.snackBar.open(error.message, 'OK!');
      }
    );
  }
}
