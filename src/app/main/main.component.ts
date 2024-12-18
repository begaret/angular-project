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
  test: Observable<Test[]>;

  constructor()
  {
    const coll = collection(this.store, 'test');
    this.test = collectionData(coll) as Observable<Test[]>;
  }
}

interface Test
{
  test: string;
};
