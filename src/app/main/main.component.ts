import { Component, inject } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

@Component({
  selector: 'app-main',
  imports: [AsyncPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
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
};

