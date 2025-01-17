import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

@Component({
  selector: 'app-welcome',
  imports: [AsyncPipe],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  store: Firestore = inject(Firestore);
  courses: Observable<Course[]>;

  constructor()
  {
    const data = collection(this.store, 'test');
    this.courses = collectionData(data) as Observable<Course[]>;
  }
}

interface Course
{
  code: string;
  name: string;
  students: number;
  grade: string;
}

