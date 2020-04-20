

import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Thread } from './thread.model';
import { ThreadsService } from './../thread/threads.service';


@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
