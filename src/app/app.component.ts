import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe, MatSlideToggleModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'snalla_funka';

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
}

