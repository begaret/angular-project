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

import { AuthService } from '../auth.service';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-auth',
  imports: [
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent
{
  auth: AuthService = inject(AuthService);

  form: FormGroup;
  type: boolean;

  constructor(private fb: FormBuilder)
  {
    this.form = this.fb.group(
      {
        email: [ '', [ Validators.required, Validators.email ] ],
        password: [ '', [ Validators.required, Validators.minLength(6) ] ]
      }
    );

    this.type = true;
  }

  on_submit(): void
  {
    if (this.type)
    {
      this.auth.log_in(this.form.value.email, this.form.value.password);
    }
    else
    {
      this.auth.create_user(this.form.value.email, this.form.value.password);
    }
  }

  switch_type(): void
  {
    this.type = !this.type;
  }
}

