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
  public p = 1;
  public total = 0;
  public filters = new FormGroup({
    search: new FormControl(''),
    roles: new FormControl(''),
    offset : new FormControl(0)
  });
  public allRoles = ['admin', 'user', 'customer'];
  constructor(
    private sUser: UserService
  ) {

    this.sUser.getAll().subscribe(r => {
      this.users = r.users;
      this.total = r.total;
    });

    this.filters.valueChanges.subscribe(r => {
      this.sUser.getAll(this.filters.value.search, this.toQuery(this.filters.value.roles), this.filters.value.offset).subscribe(r => {
        this.users = r.users;
        this.total = r.total;
      });
    });

  }

  toQuery(value: string[]){
    if (value){
      return value.join('-');
    }
  }

  pageChanged(page){
    this.p = page;
    const value = ((20 * parseInt(page)) - 20);
    this.filters.get('offset').setValue(value);
  }


  ngOnInit(): void {
  }

}
