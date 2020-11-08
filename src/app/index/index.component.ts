import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../_services/websocket.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private sWebSocket: WebsocketService
  ) { }

  ngOnInit(): void {

  }

}
