import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messages: string[] = [];

  constructor() { }

  show(message: string) {
    console.log(message);
  }

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

}
