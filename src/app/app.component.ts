import { Component, inject } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main/main.component";

import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  title = 'Moodle 1.05';

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
