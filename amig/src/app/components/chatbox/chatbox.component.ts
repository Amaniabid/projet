import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

interface Message {
  name: string;
  message: string;
}

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss'],
})
export class ChatboxComponent {
  state = false;
  messages: Message[] = [];
  inputValue = '';

  constructor(private http: HttpClient) {}

  toggleState() {
    this.state = !this.state;
  }

  onSendButton() {
    const text1 = this.inputValue.trim();
    if (text1 === '') {
      return;
    }

    const msg1: Message = { name: 'User', message: text1 };
    this.messages.push(msg1);

    this.http
      .post<any>('http://127.0.0.1:5000/predict', { message: text1 })
      .subscribe(
        (response) => {
          const msg2: Message = { name: 'Sam', message: response.answer };
          this.messages.push(msg2);
          this.updateChatText();
          this.inputValue = '';
        },
        (error) => {
          console.error('Error:', error);
          this.updateChatText();
          this.inputValue = '';
        }
      );
  }

  updateChatText() {
    let html = '';
    this.messages.slice().reverse().forEach((item) => {
      if (item.name === 'Sam') {
        html += `<div class="messages__item messages__item--visitor">${item.message}</div>`;
      } else {
        html += `<div class="messages__item messages__item--operator">${item.message}</div>`;
      }
    });

    const chatmessage = document.querySelector('.chatbox__messages');
    if (chatmessage) {
      chatmessage.innerHTML = html;
    }
  }
}