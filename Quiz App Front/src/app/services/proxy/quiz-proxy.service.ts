import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class QuizProxyService {
  constructor(
    private proxy: HttpClient,
    private localStorageS: LocalStorageService
  ) {}

  addQuiz(quizData: any) {
    const fullUrl = `${environment.apiBaseUrl}/quiz`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.post(fullUrl, quizData, { headers: headers });
  }

  getQuizById(quizId: string) {
    const fullUrl = `${environment.apiBaseUrl}/quiz/get/${quizId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  getQuizzesBySearch(searchBody: string) {
    const fullUrl = `${environment.apiBaseUrl}/search/quiz/${searchBody}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  getQuizzesForYou() {
    const fullUrl = `${environment.apiBaseUrl}/quiz/foryou`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  getQuizzesMy(userId: string) {
    const fullUrl = `${environment.apiBaseUrl}/quiz/my/${userId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }

  deleteQuiz(quizId: string) {
    const fullUrl = `${environment.apiBaseUrl}/quiz/${quizId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.delete(fullUrl, { headers: headers });
  }

  uploadResults(quizId: string, result: number) {
    const fullUrl = `${environment.apiBaseUrl}/quiz/uploadresult/${quizId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.post(fullUrl, { result: result }, { headers: headers });
  }

  getResults(quizId: string) {
    const fullUrl = `${environment.apiBaseUrl}/quiz/getresults/${quizId}`;
    const jwt: any = this.localStorageS.getWithExpiry('jwt');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${jwt}`);
    return this.proxy.get(fullUrl, { headers: headers });
  }
}
