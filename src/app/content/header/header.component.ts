import { UserService } from './../../_services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  panelOpenState;
  public menus: any = '';
  constructor(
    private sAuth: AuthenticationService,
    private sUser: UserService
  ) {
    this.sUser.getMenu(this.sAuth.currentUserValue.username).subscribe(r =>{
      this.menus = r;
    })
  }

  ngOnInit(): void {
  }

  getNome(){
    return this.sAuth.currentUserValue.name;
  }

  logout(){
    this.sAuth.logout();
  }

}
