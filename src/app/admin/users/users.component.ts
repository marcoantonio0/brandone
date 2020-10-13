import { FormControl } from '@angular/forms';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users;
  public search = new FormControl('');
  constructor(
    private sUser: UserService
  ) {
    this.sUser.getAll().subscribe(r => {
      this.users = r;
    });
  }

  ngOnInit(): void {
  }

}
