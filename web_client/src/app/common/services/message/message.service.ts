import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IMessage } from '../../Types/IMessage';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new Subject<IMessage>()
  public message$ = this.messageSource.asObservable()
  constructor() { }

  emitMessage(message:IMessage){
    this.messageSource.next(message)
  }
}
