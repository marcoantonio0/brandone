import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderService } from './../../_services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from 'src/app/_services/websocket.service';
import { Element } from '@angular/compiler';

@Component({
  selector: 'app-orderview',
  templateUrl: './orderview.component.html',
  styleUrls: ['./orderview.component.scss']
})
export class OrderviewComponent implements OnInit, OnDestroy {
  public order;
  @ViewChild('chatWrapper', { static: true }) chatWrapper: ElementRef<HTMLDivElement>;
  private id;
  private timeoutChat;
  public isTyping = false;
  public sendingType = false;
  public dataTyping: any;
  public emojiPicker = false;
  public messages = [];
  public chatForm = new FormGroup({
    text: new FormControl('')
  });
  public status = [
    {
      description: 'Aguardando orçamento',
      idstatus: 1,
      active: false
    },
    {
      description: 'Aguardando pagamento',
      idstatus: 2,
      active: false
    },
    {
      description: 'Pagamento em analise',
      idstatus: 3,
      active: false
    },
    {
      description: 'Projeto em execução',
      idstatus: 4,
      active: false
    },
    {
      description: 'Projeto em análise',
      idstatus: 5,
      active: false
    },
    {
      description: 'Concluído',
      idstatus: 6,
      active: false
    }
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sOrder: OrderService,
    private wss: WebsocketService,
    public sAuth: AuthenticationService
  ) {
    this.route.params.subscribe(params => {
      if(Object.keys(params).length > 0) {
          this.sOrder.getOrderById(params.id).subscribe(r => {
            this.id = params.id;
            this.order = r;
            this.setStatus(r.status);
            this.scrollChat();

            this.wss.emit('join room', params.id);
            this.wss.listen('message sent').subscribe(r => {
              this.messages.push(r);
              this.scrollChat();
            });
            this.wss.listen('typing sent').subscribe(r => {
              if (r.typing === true){
                if(r.id !== this.sAuth.currentUserValue.id){
                  this.isTyping = true;
                }
                this.dataTyping = r;
              } else {
                this.isTyping = false;
              }
            });


          }, e => {
            this.router.navigate(['/order']);
          });
      } else {
        this.router.navigate(['/order']);
      }
    });
  }

  ngOnInit(): void {

  }

  addEmoji(event){
    this.chatForm.get('text').setValue((this.chatForm.get('text').value ? this.chatForm.get('text').value : '') + event.emoji.native);
  }

  openEmojiPicker(){
    if(!this.emojiPicker){
      this.emojiPicker = true;
    } else {
      this.emojiPicker = false;
    }
  }

  scrollChat() {
    setTimeout(() => {
      this.chatWrapper.nativeElement.scrollTop = this.chatWrapper.nativeElement.scrollHeight;
    }, 5);
  }

   ngOnDestroy() {
    this.removeTyping();
    this.wss.emit('leave room', this.id);
   }

  setStatus(array) {
    for (const status of array) {
      const index = this.status.findIndex(x => x.idstatus === status.idstatus);
      if(index > -1){
        status['active'] = true;
        this.status[index] = status;
      }
    }
  }

  getSizeTimeline() {
    const stSize = [];
    for (const st of this.status) {
      if(st.active === true){
        stSize.push(st);
      }
    }
    if(stSize.length === 6){
      return 100;
    }
    return Math.floor(((stSize.length * 100) / this.status.length - 5));
  }

  sendMessage() {
    let date = new Date();
    if(this.chatForm.value.text != ''){
      const data = {
        message: this.chatForm.value.text,
        room: this.id,
        name: this.sAuth.currentUserValue.name,
        id: this.sAuth.currentUserValue.id,
        time: date.toISOString()
      };
      this.wss.emit('send message', data);
      this.chatForm.reset();
      this.scrollChat();
    }
  }

  sendTyping(){
    if(this.timeoutChat){
      clearTimeout(this.timeoutChat);
    }
    const data = {
      typing: true,
      room: this.id,
      name: this.sAuth.currentUserValue.name,
      id: this.sAuth.currentUserValue.id
    };
    if(!this.sendingType){
      this.sendingType = true;
      this.wss.emit('is typing', data);
    }
    this.timeoutChat = setTimeout(() => {
      this.removeTyping();
    }, 2500);
  }

  removeTyping() {
    const data = {
      typing: false,
      room: this.id,
      name: this.sAuth.currentUserValue.name,
      id: this.sAuth.currentUserValue.id
    };
    this.sendingType = false;
    this.wss.emit('remove typing', data);
  }

}
