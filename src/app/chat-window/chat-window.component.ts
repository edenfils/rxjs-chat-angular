
import { UsersService } from './../user/user.service';
import { ThreadsService } from './../thread/threads.service';
import { MessagesService } from './../message/messages.service';
import { User } from './../user/user.model';
import { Thread } from './../thread/thread.model';
import { Component, OnInit, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './../message/message.model';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.css']
})
export class ChatWindowComponent implements OnInit {

  messages: Observable<any>;
  currentThread: Thread;
  draftMessage: Message;
  currentUser: User;

  constructor(
    public messagesService: MessagesService,
    public threadsService: ThreadsService,
    public userService: UsersService,
    public el: ElementRef) { }

  ngOnInit(): void {

    this.messages = this.threadsService.currentThreadMessages;

    this.draftMessage = new Message();

    this.threadsService.currentThread.subscribe( (thread: Thread) => {
      this.currentThread = thread;
    });

    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });

    this.messages.subscribe((messages: Array<Message>) => {
      setTimeout(() => {
        this.scrollToBottom();
      });
    });
  }

  sendMessage(): void {
    const m: Message = this.draftMessage;
    m.author = this.currentUser;
    m.thread = this.currentThread;
    m.isRead = true;
    this.messagesService.addMessage(m);
    this.draftMessage = new Message();
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    scrollPane.scrollTop = scrollPane.scrollHeight;
  }

}
