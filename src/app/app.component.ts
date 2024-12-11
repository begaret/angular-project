import { Component, inject } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  title = 'angular-test';

  store: Firestore = inject(Firestore);
  test: Observable<any[]>;

  constructor()
  {
    const coll = collection(this.store, 'test');
    this.test = collectionData(coll);
  }
}
