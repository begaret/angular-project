import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';

import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  query,
  where,
  getDocs,
} from '@angular/fire/firestore';

import { Course } from './course.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DataManagerService
{
  store: Firestore = inject(Firestore);

  course_data;
  user_data;

  constructor()
  {
    this.course_data = collection(this.store, 'test');
    this.user_data = collection(this.store, 'users');
  }

  async get_user(user: User): Promise<User | null>
  {
    try
    {
      const q = query(
        this.user_data,
        where("email", "==", user.email),
        where("password", "==", user.password)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty)
      {
        console.log("snapshot is empty")
        return null;
      }

      const doc = snapshot.docs[0];
      const result = doc.data();
      return new User(
        result['name'],
        result['email'],
        result['country'],
        result['city'],
        result['password']
      );
    }
    catch (error)
    {
      console.log("error: ", error);
    }

    return null;
  }

  async set_user(user: User): Promise<User | null>
  {
    try
    {
      let user_raw = {
        name: user.name,
        email: user.email,
        country: user.country,
        city: user.city,
        password: user.password
      };

      const doc = await addDoc(this.user_data, user_raw);
      return user;
    }
    catch (error)
    {
      console.log("addDoc error: ", error);
      return null;
    }

    return null;
  }
}

