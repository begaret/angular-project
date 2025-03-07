import { Component, inject } from '@angular/core';

import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';
import { DataManagerService } from '../data-manager.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent
{
  login: LoginService = inject(LoginService);
  auth: AuthService = inject(AuthService);
  data_mgr: DataManagerService = inject(DataManagerService);

  constructor(private router: Router)
  {}

  get_user_profile(): string
  {
    if (this.login.user === null)
    {
      return "";
    }

    let names: string[] = this.login.user.name.split(" ");

    let result = "";

    for (let name of names)
    {
      result += name[0];
    }

    return result;
  }

  delete_user_profile(): void
  {
    if (this.login.user === null)
      return;

    this.data_mgr.delete_user(this.login.user);
    this.login.user = null;
    this.router.navigate(['/login']);
  }
}

