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

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
} from '@angular/fire/firestore';

import { MatCardModule } from '@angular/material/card';

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
export class LoginComponent {
  should_sign_up = false;

  login_form: FormGroup;
  signup_form: FormGroup;

  store: Firestore = inject(Firestore);
  data: any;

  constructor(private fb: FormBuilder)
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

    this.data = collection(this.store, 'users');
  }

  on_submit(active_form: FormGroup): void
  {
    if (active_form.invalid)
    {
      console.log("invalid form");
      active_form.reset();
      return;
    }

    // sign up
    if (this.should_sign_up)
    {
      let new_user: User = {
        name: active_form.value.name,
        email: active_form.value.email,
        country: 'Sweden',
        city: 'Växjö',
        password: active_form.value.password,
      };

      this.add_to_firestore(new_user);
    }
  }

  async add_to_firestore(data: any): Promise<void>
  {
    try {
      const doc = await addDoc(this.data, data);
      console.log("id: ", doc.id);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  switch_method(): void
  {
    this.should_sign_up = !this.should_sign_up;
  }
}

interface User
{
  name: string;
  email: string;
  country: string;
  city: string;
  password: string;
}

