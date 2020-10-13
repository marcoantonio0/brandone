import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users;
  public filters = new FormGroup({
    search: new FormControl(''),
    roles: new FormControl('')
  });
  public allRoles = ['admin', 'user', 'customer'];
  constructor(
    private sUser: UserService
  ) {
    this.sUser.getAll().subscribe(r => {
      this.users = r.users;
    });
    this.filters.valueChanges.subscribe(r => {
      this.sUser.getAll(this.filters.value.search, this.toQuery(this.filters.value.roles)).subscribe(r => {
        this.users = r.users;
      });
    });
  }

  toQuery(value: string[]){
    if (value){
      return value.join('-');
    }
  }

  ngOnInit(): void {
  }

}
