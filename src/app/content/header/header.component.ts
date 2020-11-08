import { WebsocketService } from 'src/app/_services/websocket.service';
import { UserService } from './../../_services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  panelOpenState;
  public notificationShow = false;
  public menus: any = '';
  public notifications = [];
  public viewedNotification = false;
  public newNotificationCounter = 0;
  constructor(
    private sAuth: AuthenticationService,
    private sUser: UserService,
    private sWebSocket: WebsocketService
  ) {
    this.sUser.getMenu(this.sAuth.currentUserValue.id).subscribe(r =>{
      this.menus = r;
    });
  }

  ngOnInit(): void {
    this.sWebSocket.listen('global notification').subscribe(r => {
      this.viewedNotification = false;
      this.newNotificationCounter = this.newNotificationCounter + 1;
      this.notifications.push(r);
    });
  }

  getNome(){
    return this.sAuth.currentUserValue.name;
  }

  logout(){
    this.sAuth.logout();
  }

  openNotification() {
    if(!this.notificationShow) {
      this.newNotificationCounter = 0;
      this.notificationShow = true;
    } else {
      this.notificationShow = false;
    }
  }

}
