import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import {
  Auth,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public user: any = null;

  constructor(private auth: Auth)
  {
    this.auth.onAuthStateChanged((user) => (this.user = user));
  }

  log_in(email: string, password: string): Promise<void>
  {
    return signInWithEmailAndPassword(this.auth, email, password).then();
  }

  log_out(): Promise<void>
  {
    return signOut(this.auth);
  }

  get is_logged_in(): boolean
  {
    return this.user !== null;
  }

  get user_id(): string | null
  {
    return this.user?.uid || null;
  }
}

