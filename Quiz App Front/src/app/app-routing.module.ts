import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardReverseService } from './guards/auth-guard-reverse.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { AddNewQuizPgComponent } from './views/add-new-quiz-pg/add-new-quiz-pg.component';
import { HomePgComponent } from './views/home-pg/home-pg.component';
import { LoginPgComponent } from './views/login-pg/login-pg.component';
import { ForyouQuizzesCpgComponent } from './views/profile-pg/foryou-quizzes-cpg/foryou-quizzes-cpg.component';
import { MyQuizzesCpgComponent } from './views/profile-pg/my-quizzes-cpg/my-quizzes-cpg.component';
import { ProfilePgComponent } from './views/profile-pg/profile-pg.component';
import { RegisterPgComponent } from './views/register-pg/register-pg.component';
import { ResetPasswordPgComponent } from './views/reset-password-pg/reset-password-pg.component';
import { ResultsPgComponent } from './views/results-pg/results-pg.component';
import { SearchPgComponent } from './views/search-pg/search-pg.component';
import { SearchQuizCpgComponent } from './views/search-pg/search-quiz-cpg/search-quiz-cpg.component';
import { SearchUserCpgComponent } from './views/search-pg/search-user-cpg/search-user-cpg.component';
import { TakeTestPgComponent } from './views/take-test-pg/take-test-pg.component';

const routes: Routes = [
  {
    path: '',
    component: HomePgComponent,
  },
  {
    path: 'register',
    canActivate: [AuthGuardReverseService],
    component: RegisterPgComponent,
  },
  {
    path: 'login',
    canActivate: [AuthGuardReverseService],
    component: LoginPgComponent,
  },
  {
    path: 'myprofile',
    canActivate: [AuthGuardService],
    component: ProfilePgComponent,
    children: [
      { path: '', redirectTo: 'foryou', pathMatch: 'full' },
      { path: 'my/:profileId', component: MyQuizzesCpgComponent },
      { path: 'foryou', component: ForyouQuizzesCpgComponent },
    ],
  },
  {
    path: 'profile/:id',
    canActivate: [AuthGuardService],
    component: ProfilePgComponent,
  },
  {
    path: 'resetpassword/:userId/:resetToken',
    canActivate: [AuthGuardReverseService],
    component: ResetPasswordPgComponent,
  },
  {
    path: 'search',
    canActivate: [AuthGuardService],
    component: SearchPgComponent,
    children: [
      { path: '', redirectTo: 'quizzes', pathMatch: 'full' },
      { path: 'quizzes', component: SearchQuizCpgComponent },
      { path: 'users', component: SearchUserCpgComponent },
    ],
  },
  {
    path: 'add-new-quiz',
    canActivate: [AuthGuardService],
    component: AddNewQuizPgComponent,
  },
  {
    path: 'takequiz/:quizId',
    canActivate: [AuthGuardService],
    component: TakeTestPgComponent,
  },
  {
    path: 'results/:quizId',
    canActivate: [AuthGuardService],
    component: ResultsPgComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
