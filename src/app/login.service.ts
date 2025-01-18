import { Injectable } from '@angular/core';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService
{
  user: User | null;

  constructor()
  {
    this.user = null;
  }
}

