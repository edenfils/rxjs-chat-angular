import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  // `currentUser` contains the current user

  currentUser: Subject<User> =  new BehaviorSubject<User>(null);

  constructor() { }

  public setCurrentUser(newUser: User): void {
    this.currentUser.next(newUser);
  }
}

export const UserServiceInjectables: Array<any> = [
  UsersService
];
