import { Component, inject } from '@angular/core';

import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';

import { DataManagerService } from '../data-manager.service';
import { LoginService } from '../login.service';
import { AuthService } from '../auth.service';

import { MatCardModule } from '@angular/material/card';

import { Course } from '../course.model';
import { User } from '../user.model';

@Component({
  selector: 'app-login',
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
{
  data_mgr: DataManagerService = inject(DataManagerService);
  login: LoginService = inject(LoginService);
  auth: AuthService = inject(AuthService);

  should_sign_up = false;

  login_form: FormGroup;
  signup_form: FormGroup;

  constructor(private router: Router, private fb: FormBuilder)
  {
    this.login_form = this.fb.group(
      {
        email: [ '', [ Validators.required, Validators.email ] ],
        password: [ '', [ Validators.required, Validators.minLength(6) ] ]
      }
    );

    this.signup_form = this.fb.group(
      {
        name: [ '', [ Validators.required, Validators.nullValidator ] ],
        email: [ '', [ Validators.required, Validators.email ] ],
        password: [ '', [ Validators.required, Validators.minLength(6) ] ]
      }
    );
  }

  on_submit(active_form: FormGroup): void
  {
    if (active_form.invalid)
    {
      console.log("invalid form");
      active_form.reset();
      return;
    }

    let user = new User(
      active_form.value.name,
      active_form.value.email,
      "Sweden",
      "Växjö",
      active_form.value.password
    );

    let result = null;

    // sign up
    if (this.should_sign_up)
    {
      if (!this.auth.is_logged_in)
      {
        console.log("not logged in!");
        active_form.reset();
        return;
      }

      result = this.data_mgr.set_user(user);
    }
    else
    {
      result = this.data_mgr.get_user(user);
    }

    result
      .then((value) => {
        if (value === null)
        {
          active_form.reset();
        }
        else
        {
          this.login.user = value;
          this.router.navigate(['/student']);
        }
      });
  }

  switch_method(): void
  {
    this.should_sign_up = !this.should_sign_up;
  }
}

