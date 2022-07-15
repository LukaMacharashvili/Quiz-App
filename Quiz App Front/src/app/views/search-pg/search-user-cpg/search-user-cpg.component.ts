import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProxyService } from 'src/app/services/proxy/user-proxy.service';

@Component({
  selector: 'app-search-user-cpg',
  templateUrl: './search-user-cpg.component.html',
  styleUrls: ['./search-user-cpg.component.css'],
})
export class SearchUserCpgComponent implements OnInit {
  searchBody: string = '';
  users: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((qParams: any) => {
      this.searchUser(qParams.searchBody);
    });
  }

  searchUser(searchBody: string) {
    this.userProxyS.getUsersBySearch(searchBody).subscribe((response: any) => {
      this.users = response;
    });
  }
}
