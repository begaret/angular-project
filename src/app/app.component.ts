import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// import { MainComponent } from './main/main.component';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {
  Firestore,
  collection,
  collectionData
} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MatSlideToggleModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent
{
  title = 'snalla_funka';
}

