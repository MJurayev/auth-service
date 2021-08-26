import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/common/services/message/message.service';
import { IMessage } from 'src/app/common/Types/IMessage';

@Component({
  selector: 'app-show-messages',
  templateUrl: './show-messages.component.html',
  styleUrls: ['./show-messages.component.css'],
})
export class ShowMessagesComponent implements OnInit {
  messages:IMessage[] =[]
  constructor(private messageSvc:MessageService) {
    this.messageSvc.message$.subscribe(message => {
      if(this.messages.length>=10)this.messages = this.messages.slice(1,10)
      this.messages.push(message)
    })
   
  }
  ngOnInit(): void {
    
  
  }

}
