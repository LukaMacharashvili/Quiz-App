import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgMaterialModule } from './ng-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeleteUserModComponent } from './views/delete-user-mod/delete-user-mod.component';
import { ForgotPasswordModComponent } from './views/forgot-password-mod/forgot-password-mod.component';
import { LoginPgComponent } from './views/login-pg/login-pg.component';
import { ProfilePgComponent } from './views/profile-pg/profile-pg.component';
import { RegisterPgComponent } from './views/register-pg/register-pg.component';
import { ResetPasswordPgComponent } from './views/reset-password-pg/reset-password-pg.component';
import { UpdateUserModComponent } from './views/update-user-mod/update-user-mod.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './views/header/header.component';
import { MyQuizzesCpgComponent } from './views/profile-pg/my-quizzes-cpg/my-quizzes-cpg.component';
import { ForyouQuizzesCpgComponent } from './views/profile-pg/foryou-quizzes-cpg/foryou-quizzes-cpg.component';
import { SearchPgComponent } from './views/search-pg/search-pg.component';
import { SearchUserCpgComponent } from './views/search-pg/search-user-cpg/search-user-cpg.component';
import { SearchQuizCpgComponent } from './views/search-pg/search-quiz-cpg/search-quiz-cpg.component';
import { AddNewQuizPgComponent } from './views/add-new-quiz-pg/add-new-quiz-pg.component';
import { TakeTestPgComponent } from './views/take-test-pg/take-test-pg.component';
import { ResultsPgComponent } from './views/results-pg/results-pg.component';

@NgModule({
  declarations: [
    AppComponent,
    DeleteUserModComponent,
    ForgotPasswordModComponent,
    LoginPgComponent,
    ProfilePgComponent,
    RegisterPgComponent,
    ResetPasswordPgComponent,
    UpdateUserModComponent,
    HeaderComponent,
    MyQuizzesCpgComponent,
    ForyouQuizzesCpgComponent,
    SearchPgComponent,
    SearchUserCpgComponent,
    SearchQuizCpgComponent,
    AddNewQuizPgComponent,
    TakeTestPgComponent,
    ResultsPgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
