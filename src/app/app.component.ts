import { AuthenticationService } from './_services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from './_services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'brandone';
  constructor(
    private sWebSocket: WebsocketService,
    private sAuth: AuthenticationService
  ) { }

  ngOnInit(){
    this.sWebSocket.emit('join', this.sAuth.currentUserValue.id);
  }

}
