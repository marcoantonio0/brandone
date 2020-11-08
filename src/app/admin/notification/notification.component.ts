import { WebsocketService } from 'src/app/_services/websocket.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  public notificationForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    icon: new FormControl(''),
    type: new FormControl(),
    link: new FormControl('')
  })
  constructor(
    private sWebSocket: WebsocketService
  ) { }

  ngOnInit(): void {
  }

  sendEvent(){
    this.sWebSocket.emit('global', {
      title: this.notificationForm.value.title,
      description: this.notificationForm.value.description,
      icon: this.notificationForm.value.icon,
      type: 'glboal',
      link: this.notificationForm.value.link
    });
  }

}