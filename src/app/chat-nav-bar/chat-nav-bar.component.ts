import { combineLatest } from 'rxjs/operators';

import { Component, OnInit, Inject } from '@angular/core';

import * as _ from 'lodash';

import { MessagesService } from './../message/messages.service';
import { ThreadsService } from './../thread/threads.service';

import { Message } from './../message/message.model';
import { Thread } from './../thread/thread.model';



@Component({
  selector: 'app-chat-nav-bar',
  templateUrl: './chat-nav-bar.component.html',
  styleUrls: ['./chat-nav-bar.component.css']
})
export class ChatNavBarComponent implements OnInit {

  unreadMessagesCount: number;

  constructor(
      public messagesService: MessagesService,
      public threadService: ThreadsService) {
      }

  ngOnInit(): void {
    this.messagesService.messages.pipe(
      combineLatest(this.threadService.currentThread,
        (messages: Message[], currentThread: Thread) => {
          return [currentThread, messages];
        })
    ).subscribe(([currentThread, messages]: [Thread, Message[]]) => {
      this.unreadMessagesCount =
        _.reduce(
          messages,
          (sum: number, m: Message) => {
            const messageIsInCurrentThread: boolean = m.thread &&
              currentThread &&
              (currentThread.id === m.thread.id);
            // note: in a "real" app you should also exclude
            // messages that were authored by the current user b/c they've
            // already been "read"
            if (m && !m.isRead && !messageIsInCurrentThread) {
              sum = sum + 1;
            }
            return sum;
          },
          0);
    });
  }
}
