import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'message-input',
  templateUrl: 'message-input.component.html'
})
export class MessageInputComponent {

  @Output() sendMessage: EventEmitter<String> = new EventEmitter<String>();;
  content: string;

  constructor() {
  }

  send() {
    if (this.content && this.content.trim() !== "") {
      this.sendMessage.emit(this.content.toLowerCase());
      this.content = "";
    }
  }

}
