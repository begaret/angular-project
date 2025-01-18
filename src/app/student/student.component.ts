import { Component, inject } from '@angular/core';

import { LoginService } from '../login.service';

@Component({
  selector: 'app-student',
  imports: [],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent
{
  login: LoginService = inject(LoginService);

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
}

