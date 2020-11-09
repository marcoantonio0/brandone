import { NotificationService } from './../../_services/notification.service';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { UserService } from './../../_services/user.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Title } from '@angular/platform-browser';
import { FilterDatePipe } from 'src/app/_pipes/filter-date.pipe';

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
  public notificationsArray;
  public viewedNotification = false;
  public newNotificationCounter = 0;
  constructor(
    private sAuth: AuthenticationService,
    private sUser: UserService,
    private sWebSocket: WebsocketService,
    private title: Title,
    private sNotification: NotificationService,
    private filterDate: FilterDatePipe
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
      this.notificationsArray = this.filterDate.transform(this.notifications);
      const audio = new Audio('assets/audio/short_notification.mp3');
      audio.play();
      this.changeTitle();
    });

    this.sNotification.getNotification(this.sAuth.currentUserValue.id).subscribe(r => {
      this.notifications = r;
      this.notificationsArray = this.filterDate.transform(this.notifications);
    });

  }

  getNome(){
    return this.sAuth.currentUserValue.name;
  }

  changeTitle(){
    if(this.title.getTitle().split(' ').length > 1){
      this.title.setTitle(`(${this.newNotificationCounter}) ${this.title.getTitle().split(' ')[1]}`);
    } else {
      this.title.setTitle(`(${this.newNotificationCounter}) ${this.title.getTitle()}`);
    }
  }

  resetTitle() {
    if (this.title.getTitle().split(' ').length > 1){
      this.title.setTitle(`${this.title.getTitle().split(' ')[1]}`);
    }
  }

  logout(){
    this.sAuth.logout();
  }

  openNotification() {
    if(!this.notificationShow) {
      this.resetTitle();
      this.newNotificationCounter = 0;
      this.notificationShow = true;
    } else {
      this.notificationShow = false;
    }
  }

}
