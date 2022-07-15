import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';
import { QuizProxyService } from 'src/app/services/proxy/quiz-proxy.service';
import { UserProxyService } from 'src/app/services/proxy/user-proxy.service';
import { DeleteUserModComponent } from '../delete-user-mod/delete-user-mod.component';
import { UpdateUserModComponent } from '../update-user-mod/update-user-mod.component';

@Component({
  selector: 'app-profile-pg',
  templateUrl: './profile-pg.component.html',
  styleUrls: ['./profile-pg.component.css'],
})
export class ProfilePgComponent implements OnInit {
  userData: any = {};
  quizzes: any[] = [];
  currentRoute: any = '';

  constructor(
    private authProxyS: AuthProxyService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxyService,
    private quizProxyS: QuizProxyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.getUserProfile(params.id);
      } else {
        this.getRegisteredUser();
      }
    });
    this.currentRoute = this.router.url;
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.urlAfterRedirects;
      }
    });
  }

  getUserProfile(id: string) {
    this.userProxyS.getUser(id).subscribe((response: any) => {
      const { password, verficationToken, ...user } = response;
      this.userData = user;
      this.getMyQuizzes();
    });
  }

  getMyQuizzes() {
    this.quizProxyS
      .getQuizzesMy(this.userData._id)
      .subscribe((response: any) => {
        this.quizzes = response;
      });
  }

  getRegisteredUser() {
    this.authProxyS.whoami().subscribe((response) => {
      this.userData = response;
    });
  }

  openDeleteUserModuleBtnClick() {
    this.dialog.open(DeleteUserModComponent);
  }

  openUpdateUserFormBtnClick() {
    this.dialog.open(UpdateUserModComponent);
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.router.navigate(['login']);
  }
}
