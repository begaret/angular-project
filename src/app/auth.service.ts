import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';

import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  public user: any = null;


  public cant_log_in: boolean = true;

  constructor(private router: Router, private auth: Auth)
  {
    this.auth.onAuthStateChanged((user) => (this.user = user));
  }

  async create_user(email: string, password: string): Promise<void>
  {
    try
    {
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.user = user;
      this.cant_log_in = false;
      this.router.navigate(['/main']);
    }
    catch (error)
    {
      this.user = null;
      this.cant_log_in = true;
    }
  }

  async log_in(email: string, password: string): Promise<void>
  {
    try
    {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.user = user;
      this.cant_log_in = false;
      this.router.navigate(['/login']);
    }
    catch (error)
    {
      this.user = null;
      this.cant_log_in = true;
    }
  }

  log_out(): Promise<void>
  {
    return signOut(this.auth);
  }

  get is_logged_in(): boolean
  {
    return !this.cant_log_in;
  }

  get user_id(): string | null
  {
    return this.user?.uid || null;
  }
}

